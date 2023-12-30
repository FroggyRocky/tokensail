import {useObserver} from "@lib/hooks/hooks";
import {useQuery} from "@apollo/client";
import {GET_ALL_USER_NFTS} from "@api/queries";
import {NftTokenPreviewType} from "@store/accountStore/accountTypes";
import React, {useMemo, useRef, useState} from "react";
import {NftCard} from "@UIKit/Nfts/NftCard/NftCard";
import {AccountLayout} from "@components/Account/AccountLayout";
import {SimpleLoader} from "@UIKit/SimpleLoader/SimpleLoader";

type Props = {

};
type NftPreviewType = {
    getUserNfts: {
        ownedNfts: NftTokenPreviewType[],
        pageKey: string,
        totalCount: number,
    }
}
const ITEMS_PER_PAGE = 10
export function Nfts(props: Props) {
   const lastElementRef = useRef(null)
    const [search, setSearch] = useState('');
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

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };
    const Nfts = useMemo(() => {
        if(!data) return;
        let filteredNfts = data?.getUserNfts.ownedNfts
        if(search) {
            filteredNfts = filteredNfts?.filter(nft => nft.name?.toLowerCase().includes(search.toLowerCase()))
        }
        return filteredNfts?.map((nft, index) => {
            if (filteredNfts?.length === index + 1) {
                return <div ref={lastElementRef} className={'flex-shrink-0'}>
                    <NftCard  key={nft.tokenId}
                             backupMedia={nft.contract.openSeaMetadata.imageUrl} id={+nft.tokenId} collectionName={nft.name}
                             media={nft.raw.metadata.image}/>
                </div>
            }
            return <div className={'flex-shrink-0'}>
                <NftCard key={nft.tokenId}
                         backupMedia={nft.contract.openSeaMetadata.imageUrl} id={+nft.tokenId} collectionName={nft.name}
                         media={nft.raw.metadata.image}/>
            </div>
        })}, [search, data])
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
    useObserver(lastElementRef, observeCallback, observerOptions)
    return <AccountLayout>
        <div className={'flex gap-10 flex-wrap items-center justify-center my-5'}>
            {loading ? <SimpleLoader /> :
        Nfts && Nfts.length > 0 ? Nfts : <p className={'text-green-400 text-xs mr-auto mt-3'}>No NFTs found</p>}
    </div>
    </AccountLayout>
};