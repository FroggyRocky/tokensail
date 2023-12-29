import {NftFolderType} from "@store/accountStore/accountTypes";
import React, {useMemo, useRef, useState} from "react";
import {NftCard} from "@UIKit/Nfts/NftCard/NftCard";
import {GalleryLayout} from "@components/Account/Gallery/GalleryLayout";
import {useObserver} from "@lib/hooks/hooks";
import {useMutation} from "@apollo/client";
import {ADD_TOKENS_TO_FOLDER} from "@api/mutations";
import {Modal} from "@UIKit/Modal/Modal";
import {NftFolderCreation} from "@components/Account/Nfts/NftFolderCreation/NftFolderCreation";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@store/authStore/authStore";

const PAGE_SIZE = 10

type Props = {
    folder_id: string
    folder_data: NftFolderType
};


export function GalleryFolder(props: Props) {
    const {refresh} = useRouter()
    const [page, setPage] = useState(0)
    const total = props.folder_data.tokens?.length
    const lastElementRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [generalErr, setGeneralErr] = useState<string | undefined>()
    const [selectedTokens, setSelectedTokens] = useState<Array<{ token_id: string, contract_address: string }>>([])
    const [search, setSearch] = useState('')
    const token = useAuthStore(state => state.auth_token)
    const [isLoading, setIsLoading] = useState(false)
    const [addTokens, {
        data: galleryData,
        loading: galleryLoading,
        error: galleryError
    }] = useMutation(ADD_TOKENS_TO_FOLDER, {
        context: {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        },
        onCompleted: async (data: { addTokensToFolder: Array<NftFolderType> }) => {
            refresh()
        },
        onError: (error) => {
            console.log(error)
            setGeneralErr(error.message)
        },
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    function observerCallback() {
        if ((page + 1) * PAGE_SIZE >= Number(total)) return
        setPage(prevPage => prevPage + 1)
    }

    useObserver(lastElementRef, observerCallback, observerOptions)

    const folderTokens = useMemo(() => {
        let filteredTokens = props.folder_data.tokens
        if (search) {
            filteredTokens = filteredTokens?.filter((nft) => nft.data.name?.toLowerCase().includes(search.toLowerCase()))
        }
        return filteredTokens?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
            .map((nft, index, originalArr) => {
                if (originalArr.length === index + 1) {
                    return <div key={nft.data.tokenId} ref={lastElementRef}>
                        <NftCard backupMedia={nft.data.contract.openSeaMetadata.imageUrl} id={+nft.data.tokenId}
                                 collectionName={nft.data.name}
                                 media={nft.data.raw.metadata.image}/>
                    </div>
                } else {
                    return <div key={nft.data.tokenId}>
                        <NftCard backupMedia={nft.data.contract.openSeaMetadata.imageUrl} id={+nft.data.tokenId}
                                 collectionName={nft.data.name}
                                 media={nft.data.raw.metadata.image}/>
                    </div>
                }
            })
    }, [props.folder_id, page, search])

    function handleSearchChange(e: any) {
        setSearch(e.target.value)
        setPage(0)
    }

    async function handleSubmit(values: any, selectedTokens?: Array<{ token_id: string, contract_address: string }>) {
        console.log(selectedTokens)
        await addTokens({
            variables: {
                folderId: props.folder_id,
                tokens: selectedTokens
            }
        })
    }

    return <GalleryLayout handleAddClick={() => setIsModalOpen(true)} folder_id={props.folder_id}
                          folder_name={props.folder_data.name} handleSearchChange={handleSearchChange}>
        {isModalOpen && <Modal handleClose={() => setIsModalOpen(false)}>
            {generalErr && <p className={'text-red-500 text-xs mr-auto mt-3'}>{generalErr}</p>}
            <NftFolderCreation folderTokens={props.folder_data.tokens} isSecondStepClosed={true}
                               handleSubmit={handleSubmit}/>

        </Modal>}
        <div className={'flex gap-10 flex-wrap items-center justify-center'}>
            {folderTokens && folderTokens.length > 0 ? folderTokens : <p className={'text-center text-gray-500 text-xl'}>No folders found</p>}
        </div>
    </GalleryLayout>
};