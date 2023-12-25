import React, {useRef, useState} from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {OutlinedBtn} from "@UIKit/OutlinedBtn/OutlinedBtn";
import {useAccountStore} from "@store/accountStore/accountStore";
import {useAuthStore} from "@store/authStore/authStore";
import {useMutation, useQuery} from '@apollo/client';
import {GET_ALL_USER_NFTS} from "@api/queries";
import {CREATE_NFT_FOLDER} from '@api/mutations'
import {SimpleLoader} from "@UIKit/SimpleLoader/SimpleLoader";
import {NftCard} from "@UIKit/Nfts/NftCard/NftCard";
import {NftTokenPreviewType} from "@store/accountStore/accountTypes";
import {CommonInput} from "@UIKit/CommonInput/CommonInput";
import {FileAttach} from "@UIKit/FileAttach/FileAttach";

const ITEMS_PER_PAGE = 10
const MAX_DESCRIPTION_LENGTH = 100
const MAX_GALLERY_NAME_LENGTH = 50
const validationSchema = Yup.object({
    gallery_name: Yup.string().required('Gallery Name is required').max(MAX_GALLERY_NAME_LENGTH, 'Gallery Name should be less than 50 characters'),
    description: Yup.string().max(MAX_DESCRIPTION_LENGTH, 'Description should be less than 100 characters'),
    banner_img: Yup.string(),
});

const initialValues = {
    gallery_name: '',
    description: '',
    banner_img: undefined as File | undefined,
};


type NftPreviewType = {
    getUserNfts: {
        ownedNfts: NftTokenPreviewType[],
        pageKey: string,
        totalCount: number,
    }
}

export function NftFolderCreation() {
    const [formStep, setFormStep] = useState(1)
    const token = useAuthStore.getState().auth_token
    const accountData = useAccountStore(state => state.accountData)
    const [selectedTokens, setSelectedTokens] = useState<number[]>([])
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null)
    const {loading, error, data, previousData, fetchMore} = useQuery<NftPreviewType>(GET_ALL_USER_NFTS, {
        variables: {
            pageSize: ITEMS_PER_PAGE
        },
        context: {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_JWT}`
            }
        }
    });
    const [createGallery, {
        data: galleryData,
        loading: galleryLoading,
        error: galleryError
    }] = useMutation(CREATE_NFT_FOLDER, {
        context: {
            headers: {
                Content_Type: 'multipart/form-data',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_JWT}`
            }
        },
        onCompleted: (data) => {
            console.log('Todo added successfully:', data.addTodo);
            // You can perform additional actions after the mutation is completed
        },
        onError: (error) => {
            console.error('Error adding todo:', error);
            // Handle errors here
        },
    });
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };


    function handleBannerAttach(e: React.ChangeEvent<HTMLInputElement>) {
        formik.setFieldValue('banner_img', e.target.files![0])
        console.log(e.target.files![0])
    }

    async function observeCallback(entries: any, observer: any) {
        if (entries[0].isIntersecting) {
            await fetchMore({
                variables: {
                    pageSize: ITEMS_PER_PAGE,
                    pageKey: previousData?.getUserNfts.pageKey ?? ''
                },
                context: {
                    headers: {
                        Content_Type: 'multipart/form-data',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_JWT}`
                    }
                },
                updateQuery: (previousResult, {fetchMoreResult}) => {
                    const newEdges = fetchMoreResult?.getUserNfts.ownedNfts;
                    const pageInfo = fetchMoreResult?.getUserNfts.pageKey;
                    const totalCount = fetchMoreResult?.getUserNfts.totalCount;
                    return newEdges.length
                        ? {
                            getUserNfts: {
                                ownedNfts: [...previousResult.getUserNfts.ownedNfts, ...newEdges],
                                pageKey: pageInfo,
                                totalCount: totalCount
                            }
                        }
                        : previousResult;
                }
            });
        }
    }

    function setObserver(node: any) {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        observerRef.current = new IntersectionObserver(observeCallback, observerOptions);
        if (node) {
            observerRef.current.observe(node);
        }

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: false,
        onSubmit,
    })

    async function onSubmit(values: any) {
        const formData = new FormData()
        if (selectedTokens.length === 0) {
            setGeneralError('Please select at least one Nft')
            return
        }
        setGeneralError('')
        formData.append('gallery_name', values.gallery_name)
        formData.append('description', values.description)
        formData.append('banner_img', values.banner_img)
        console.log(values.banner_img)
        const res = await createGallery({
            variables: {
                data:  values.banner_img,
            }
        })
        console.log(res)
    }

    function handleTokenSelection(tokenId: number) {
        if (selectedTokens.includes(tokenId)) {
            setSelectedTokens(prevState => {
                return prevState.filter(token => token !== tokenId)
            })
            return
        }
        setSelectedTokens(prevState => {
            return [...prevState, tokenId]
        })
    }

    const Nfts = data?.getUserNfts.ownedNfts.map((nft, index) => {
        if (data.getUserNfts.ownedNfts.length === index + 1) {
            return <div ref={setObserver} className={'flex-shrink-0'}>
                <NftCard isSelected={selectedTokens.includes(+nft.tokenId)}
                         handleClick={() => handleTokenSelection(+nft.tokenId)} key={nft.tokenId}
                         backupMedia={nft.contract.openSeaMetadata.imageUrl} id={+nft.tokenId} collectionName={nft.name}
                         media={nft.raw.metadata.image}/>
            </div>
        }
        const isSelected = selectedTokens.includes(+nft.tokenId)
        return <div className={'flex-shrink-0'}>
            <NftCard isSelected={isSelected} handleClick={() => handleTokenSelection(+nft.tokenId)} key={nft.tokenId}
                     backupMedia={nft.contract.openSeaMetadata.imageUrl} id={+nft.tokenId} collectionName={nft.name}
                     media={nft.raw.metadata.image}/>
        </div>
    })
    return <div>
        <form onSubmit={formik.handleSubmit}>
            {formStep === 0 ? <div>
                    <aside className={'flex flex-col align-baseline flex-grow items-center'}>
                        <h2 className={'text-center mb-5 font-medium'}>Choose Nfts for your Gallery Collection</h2>
                        {data && <div className={'w-full my-4 flex-grow'}>
                            <OutlinedBtn text={'Next'} type={'button'} onClick={() => setFormStep(1)}/>
                        </div>}
                        {data ? <div className={'flex items-center gap-8 flex-wrap justify-center mb-5 max-w-2xl'}>
                                {loading ? <SimpleLoader/> : <>
                                    {Nfts}
                                </>
                                }
                            </div> :
                            <h2 className={'text-center'}>No items found</h2>}
                    </aside>
                </div>
                :
                <div>
                    <div className={'flex flex-col gap-5 flex-grow'}>
                        <CommonInput value={formik.values.gallery_name} name={'gallery_name'}
                                     placeholder={'You Gallery Name'} error={formik.errors.gallery_name}
                                     handleChange={formik.handleChange} label={'Gallery Name'}
                                     charLimit={MAX_GALLERY_NAME_LENGTH}/>
                        <CommonInput value={formik.values.description} name={'description'} placeholder={'Description'}
                                     error={formik.errors.description}
                                     label={'Description'} handleChange={formik.handleChange}
                                     charLimit={MAX_DESCRIPTION_LENGTH}/>
                        <FileAttach name={'banner_img'} accept={'ímage/*'} handleChange={handleBannerAttach}
                                    value={formik.values.banner_img?.name ?? ''}/>
                    </div>
                    {generalError && <p className={'text-red-500 text-xs mr-auto mt-3'}>{generalError}</p>}
                    <div className={'flex items-center justify-between gap-3 mt-10'}>
                        <OutlinedBtn text={'Prev'} type={'button'} onClick={() => setFormStep(0)}/>
                        <OutlinedBtn text={'Create'} type={'submit'} isDisabled={Object.entries(formik.errors).length > 0}/>
                    </div>
                </div>
            }
        </form>
    </div>
};