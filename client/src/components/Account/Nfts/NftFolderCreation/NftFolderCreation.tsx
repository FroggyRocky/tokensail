import React, {useMemo, useRef, useState} from "react";
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
import {authThunk} from "@store/authStore/authThunks";
import {NftFolderType} from "@store/accountStore/accountTypes";

const ITEMS_PER_PAGE = 10
const MAX_DESCRIPTION_LENGTH = 100
const MAX_GALLERY_NAME_LENGTH = 50

const validationSchema = Yup.object({
    gallery_name: Yup.string().required('Gallery Name is required').max(MAX_GALLERY_NAME_LENGTH, 'Gallery Name should be less than 50 characters'),
    description: Yup.string().max(MAX_DESCRIPTION_LENGTH, 'Description should be less than 100 characters'),
    banner_img: Yup.string()
        .matches(/(?:https?|ftp):\/\/\S+\.(?:jpg|jpeg|png|gif|bmp)/, 'Only images are allowed'),
});

const initialValues = {
    gallery_name: '',
    description: '',
    banner_img: '',
};


type NftPreviewType = {
    getUserNfts: {
        ownedNfts: NftTokenPreviewType[],
        pageKey: string,
        totalCount: number,
    }
}
type Props = {
    isSecondStepClosed?: boolean
    folder_id?: string
    handleSubmit?: (values: any, selectedToken?:Array<{ token_id: string, contract_address: string }>) => void
    folderTokens?: Array<{token_id:string, contract_address:string}>
} | {
    isSecondStepClosed: true
    folder_id: string
    folderTokens: Array<{token_id:string, contract_address:string}>
    handleSubmit?: (values: any, selectedToken?:Array<{ token_id: string, contract_address: string }>) => void
}
export function NftFolderCreation(props:Props) {
    const [formStep, setFormStep] = useState(0)
    const [selectedTokens, setSelectedTokens] = useState<Array<{token_id:string, contract_address:string}>>( [])
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [search,setSearch] = useState<string>('')
    const token = useAuthStore(state => state.auth_token);
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
                Authorization: `Bearer ${token.token}`
            }
        },
        onCompleted: async (data:{createNftFolder:Array<NftFolderType>}) => {
            setIsSubmitted(true)
            const setNftFolders = useAccountStore.getState().setAccountNftFolders
            setNftFolders(data.createNftFolder)
            setSelectedTokens([])
            formik.resetForm()
            setTimeout(() => {
                setIsSubmitted(false)
            }, 10000)
        },
        onError: (error) => {
            setGeneralError(error.message)
        },
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    async function observeCallback(entries: any, observer: any) {
        if (entries[0].isIntersecting) {
            await fetchMore({
                variables: {
                    pageSize: ITEMS_PER_PAGE,
                    pageKey: previousData?.getUserNfts.pageKey ?? ''
                },
                context: {
                    headers: {
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
        if(props.handleSubmit) {
            props.handleSubmit(values, selectedTokens)
            return
        }
        if (selectedTokens.length === 0) {
            setGeneralError('Please select at least one Nft')
            return
        }
        setGeneralError('')
        await createGallery({
            variables: {
                name: values.gallery_name,
                description: values.description,
                bannerUrl:  values.banner_img,
                tokens: selectedTokens
            }
        })
    }

    function handleTokenSelection(token_id: string, contract_address:string) {
        const found = selectedTokens.find(token => token.token_id === token_id && token.contract_address === contract_address)
        if (found) {
            setSelectedTokens(prevState => {
                return prevState.filter(token => token.token_id !== token_id && token.contract_address !== contract_address)
            })
            return
        }
        const newToken = {token_id, contract_address}
        setSelectedTokens(prevState => {
            return [...prevState, newToken]
        })
    }

    const Nfts = useMemo(() => {
        if(!data) return;
        let filteredNfts = data?.getUserNfts.ownedNfts
        if(search) {
            filteredNfts = filteredNfts?.filter(nft => nft.name?.toLowerCase().includes(search.toLowerCase()))
        }
        if(props.folderTokens) {
            filteredNfts = filteredNfts?.filter(nft => {
                return !props.folderTokens?.find(token => token.token_id === nft.tokenId && token.contract_address === nft.contract.address)
            })
        }
        return filteredNfts?.map((nft, index) => {
        const isSelected = !!selectedTokens.find(token => token.token_id === nft.tokenId && token.contract_address === nft.contract.address)
        if (filteredNfts?.length === index + 1) {
            return <div ref={setObserver} className={'flex-shrink-0'}>
                <NftCard isSelected={isSelected}
                         handleClick={() => handleTokenSelection(nft.tokenId, nft.contract.address)} key={nft.tokenId}
                         backupMedia={nft.contract.openSeaMetadata.imageUrl} id={+nft.tokenId} collectionName={nft.name}
                         media={nft.raw.metadata.image}/>
            </div>
        }
        return <div className={'flex-shrink-0'}>
            <NftCard isSelected={isSelected} handleClick={() => handleTokenSelection(nft.tokenId, nft.contract.address)} key={nft.tokenId}
                     backupMedia={nft.contract.openSeaMetadata.imageUrl} id={+nft.tokenId} collectionName={nft.name}
                     media={nft.raw.metadata.image}/>
        </div>
    })}, [search, selectedTokens, data])
    function handleSearchChange(e: any) {
        const value = e.target.value
        setSearch(value)
    }
    return <div>
        <form onSubmit={formik.handleSubmit}>
            {formStep === 0 ? <div>
                    <aside className={'flex flex-col align-baseline flex-grow items-center'}>
                        <h2 className={'text-center mb-5 font-medium'}>Choose Nfts for your Gallery Collection</h2>
                        {props.isSecondStepClosed && props.handleSubmit &&
                            <OutlinedBtn text={'Add tokens'} type={'button'} isDisabled={selectedTokens.length === 0}
                                         onClick={() => props.handleSubmit && props.handleSubmit(formik.values, selectedTokens)}/>
                        }
                        {data && !props.isSecondStepClosed && <div className={'w-full my-4 flex-grow'}>
                            <OutlinedBtn text={'Next'} type={'button'} onClick={() => {
                                if(props.isSecondStepClosed) return
                                setFormStep(1)
                            }}/>
                        </div>}
                        {data && <div className={'my-5'}>
                            <CommonInput value={search} name={'search'} error={''}
                                              label={'Search By name'} placeholder={'Search'}
                                              handleChange={handleSearchChange}  />
                        </div> }
                        {data ? <div className={'flex items-center gap-8 flex-wrap justify-center mb-5 max-w-2xl'}>
                                {loading ? <SimpleLoader/> : <>
                                    {Nfts && Nfts.length > 0 ? Nfts : <p className={'text-center text-gray-500 text-xl'}>No Nfts found</p>}
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
                        <CommonInput value={formik.values.banner_img} name={'banner_img'} placeholder={'Link to image'}
                                     error={formik.errors.banner_img}
                                     label={'Banner Image Link'} handleChange={formik.handleChange} />
                    </div>
                    {generalError && <p className={'text-red-500 text-xs mr-auto mt-3'}>{generalError}</p>}
                    {isSubmitted && <p className={'text-green-400 text-xs mr-auto mt-3'}>Nft Folder has been successfully created</p>}
                    <div className={'flex items-center justify-between gap-3 mt-10'}>
                        <OutlinedBtn text={'Prev'} type={'button'} onClick={() => setFormStep(0)} isDisabled={galleryLoading} />
                        <OutlinedBtn text={'Create'} type={'submit'} isDisabled={Object.entries(formik.errors).length > 0 || galleryLoading } />
                    </div>
                </div>
            }
        </form>
    </div>
};