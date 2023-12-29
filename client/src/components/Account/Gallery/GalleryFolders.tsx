import React, {useCallback, useMemo, useRef, useState} from 'react';
import {GalleryLayout} from "@components/Account/Gallery/GalleryLayout";
import {NftFolderType} from '@store/accountStore/accountTypes'
import {useObserver} from "@lib/hooks/hooks";
import {useRouter} from "next/navigation";
import {Modal} from "@UIKit/Modal/Modal";
import {NftFolderCreation} from "@components/Account/Nfts/NftFolderCreation/NftFolderCreation";
import {NftCard} from "@UIKit/Nfts/NftCard/NftCard";
import Link from "next/link";
type Props = {
    folders_data: NftFolderType[]
};
const PAGE_SIZE = 10

export function GalleryFolders(props: Props) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const {refresh} = useRouter()
    const total = props.folders_data
    const lastElementRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
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
    const handleSearchChange = useCallback((e: any) => {
        setSearch(e.target.value)
        setPage(0)
    }, [])


    const folders = useMemo(() => {
        let filtered = props.folders_data
        if (search) {
            filtered = filtered.filter(folder => folder.name?.toLowerCase().includes(search.toLowerCase()))
        }
        return filtered.slice(0, (page + 1) * PAGE_SIZE).map((folder, index) => {
            if (!folder.tokens) return
            const firstTokenData = folder.tokens[0].data
            if ((page + 1) * PAGE_SIZE === index + 1) {
                return <Link ref={lastElementRef} key={folder.id} href={`/account/gallery/${folder.id}`}>
                    <NftCard key={folder.id} id={+folder.id}
                                backupMedia={firstTokenData.contract.openSeaMetadata.imageUrl}
                                collectionName={folder.name}
                                media={firstTokenData.raw.metadata.image}/>
                </Link>
            } else {
                return <Link href={`/account/gallery/${folder.id}`}>
                    <NftCard key={folder.id} id={+folder.id}
                                backupMedia={firstTokenData.contract.openSeaMetadata.imageUrl}
                                collectionName={folder.name}
                                media={firstTokenData.raw.metadata.image}/>
                </Link>
            }
        })
    }, [props.folders_data, search, page])

    return <GalleryLayout handleSearchChange={handleSearchChange} handleAddClick={() => setIsModalOpen(true)}>
        {isModalOpen && <Modal handleClose={() => setIsModalOpen(false)}>
            <NftFolderCreation/>
        </Modal>}
        <div className={'flex gap-10 items-center justify-center flex-wrap'}>
            {folders.length > 0 ? folders : <p className={'text-center text-gray-500 text-xl'}>No folders found</p>}
        </div>
    </GalleryLayout>
};