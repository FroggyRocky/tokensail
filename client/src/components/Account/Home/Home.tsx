import {useAccountStore} from "@store/accountStore/accountStore";
import {TransactionPreview} from "@UIKit/Transactions/TransactionPreview";
import {AddNftBox} from "@UIKit/Nfts/AddNftBox/AddNftBox";
import {useEffect, useState} from "react";
import {Modal} from "@UIKit/Modal/Modal";
import {NftFolderCreation} from "@components/Account/Nfts/NftFolderCreation/NftFolderCreation";
import {NftCard} from "@UIKit/Nfts/NftCard/NftCard";
import Link from 'next/link'
export function Home() {
    const accountData = useAccountStore(state => state.accountData)
    const [isNftModalOpen, setIsNftModalOpen] = useState(false)
const transactions = accountData?.wallet_activity?.map((transaction, index) => {
    return <div className={'my-5'}>
        <TransactionPreview key={index} transaction={transaction.type}
                            amount={transaction.amount} currency={transaction.currency.symbol}
                            date={transaction.date.date}  />
    </div>
})

useEffect(() => {
    if(isNftModalOpen) {
        document.body.style.overflow = 'hidden'
    }
    else document.body.style.overflow = 'unset'
    return () => {
        document.body.style.overflow = 'unset'
    }
}, [isNftModalOpen])

function recentGalleries() {
        if(accountData?.nft_folders?.length) {
            const lastGallery = accountData?.nft_folders[accountData?.nft_folders?.length - 1]
            if(!lastGallery?.tokens?.length) return ''
            const lastTokenData = lastGallery?.tokens[lastGallery?.tokens?.length - 1].data
            if(accountData?.nft_folders?.length > 1) {
                const lastButOneGallery = accountData?.nft_folders[accountData?.nft_folders?.length - 2]
                if(!lastButOneGallery?.tokens?.length) return ''
                const lastButOneTokenData = lastButOneGallery?.tokens[lastButOneGallery?.tokens?.length - 1].data
            return <>
                <Link href={`/account/gallery/${lastGallery?.id}`} className={'w-fit'}>
                    <NftCard media={lastTokenData.raw.metadata.image} id={+lastGallery!.id}  collectionName={lastGallery.name}
                             backupMedia={lastTokenData.contract.openSeaMetadata.imageUrl}  />
                </Link>
                <Link href={`/account/gallery/${lastButOneGallery?.id}`} className={'w-fit'}>
                    <NftCard media={lastButOneTokenData.raw.metadata.image} id={+lastButOneGallery!.id}  collectionName={lastButOneTokenData.name}
                             backupMedia={lastButOneTokenData.contract.openSeaMetadata.imageUrl} />
                </Link>
            </>
                } else {
                return <>
                    <Link href={`/account/gallery/${lastGallery?.id}`} className={'w-fit'}>
                        <NftCard media={lastTokenData.raw.metadata.image} id={+lastGallery!.id}  collectionName={lastGallery.name}
                                 backupMedia={lastTokenData.contract.openSeaMetadata.imageUrl}  />
                    </Link>
                    <section className={'max-w-lg'} onClick={() => setIsNftModalOpen(true)}>
                        <AddNftBox />
                    </section>
                        </>
            }
        } else {
            return  <>
                <section className={'max-w-lg'} onClick={() => setIsNftModalOpen(true)}>
                    <AddNftBox />
                </section>
                <section className={'max-w-lg'} onClick={() => setIsNftModalOpen(true)}>
                    <AddNftBox />
                </section>
            </>
        }
}

    return <div className={'flex items-center justify-center h-full py-5'}>
        {isNftModalOpen && <Modal handleClose={() => setIsNftModalOpen(false)} >
            <NftFolderCreation />
        </Modal>}
        <main>
            <div className={'grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-5'}>
            <aside className={'px-4 py-5 rounded border border-amber-50 hover:border-amber-50 max-w-lg h-full'}>
                {!!accountData?.wallet_activity?.length ? <>
                        <h2 className={'text-amber-50'}>Recent Transaction</h2>
                        {transactions}
                    </> : <p>No recent transaction</p>}
            </aside>
            <aside>
                <h2 className={'text-xl mb-3'}>Nft Galleries</h2>
                <div  className={'flex flex-col justify-between h-full gap-5'}>
                    {recentGalleries()}
                </div>
            </aside>
            </div>
            <aside className={'w-full mt-5'}>
                <h2 className={'text-xl mb-3'}>Following Tokens</h2>
                <div className={'flex items-center w-full max-w-full gap-5'}>
            <section className={'flex-grow'}>
                <AddNftBox />
            </section>
            <section className={'flex-grow'}>
                <AddNftBox />
            </section>
            <section className={'flex-grow'}>
                <AddNftBox />
            </section>
                </div>
            </aside>
        </main>
    </div>
};