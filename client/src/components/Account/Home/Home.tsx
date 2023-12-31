import {useAccountStore} from "@store/accountStore/accountStore";
import {TransactionPreview} from "@UIKit/Transactions/TransactionPreview";
import {AddNftBox} from "@UIKit/Nfts/AddNftBox/AddNftBox";
import {useEffect, useMemo, useState} from "react";
import {Modal} from "@UIKit/Modal/Modal";
import {NftFolderCreation} from "@components/Account/Nfts/NftFolderCreation/NftFolderCreation";
import {NftCard} from "@UIKit/Nfts/NftCard/NftCard";
import Link from 'next/link'
import {FollowCryptoForm} from "@components/Account/Home/FollowCryptoForm";
import {FollowingCryptoBox} from '@UIKit/FollowingCryptoBox/FollowingCryptoBox'
import {useMutation} from "@apollo/client";
import {CREATE_NFT_FOLDER, UNFOLLOW_CRYPTO} from "@api/mutations";
import {NftFolderType} from "@store/accountStore/accountTypes";
import {SupportedCurrenciesType} from '@store/accountStore/accountTypes'
import {useAuthStore} from "@store/authStore/authStore";
type UnfollowCryptoResType = {
    unfollowCrypto: {
        following_cryptos: Array<SupportedCurrenciesType>
    }
}
export function Home() {
    const accountData = useAccountStore(state => state.accountData)
    const followingCryptos = useAccountStore(state => state.followingCryptos)
    const [isNftModalOpen, setIsNftModalOpen] = useState(false)
    const [isFollowCryptoFormOpen, setIsFollowCryptoFormOpen] = useState(false)
    const setFollowingCryptos = useAccountStore(state => state.setFollowingCryptos)
    const token = useAuthStore(state => state.auth_token)
    const [unfollowCrypto, {
        data: unfollowCryptoData,
        loading: unfollowCryptoLoading,
        error: unfollowCryptoError
    }] = useMutation(UNFOLLOW_CRYPTO, {
        context: {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        },
        onCompleted: async (data:UnfollowCryptoResType) => {
            setFollowingCryptos(data.unfollowCrypto.following_cryptos)
        }
    });

    const transactions = accountData?.wallet_activity?.map((transaction, index) => {
    return <div className={'my-5'}>
        <TransactionPreview key={index} transaction={transaction.type}
                            amount={transaction.amount} currency={transaction.currency.symbol}
                            date={transaction.date.date}  />
    </div>
})



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
async function handleUnfollowCrypto(currency: string | undefined) {
        if(!currency) return
        await unfollowCrypto({variables: {crypto:currency}})

}
const followingCryptosComponents = useMemo(() => {
    const components = []
    for(let i = 0; i < 3; i++) {
        if(followingCryptos[i]) {
            let currency = followingCryptos[i]
            if(!currency) {
                components.push(<section className={'flex-1 flex-shrink-0'} key={i} onClick={() => setIsFollowCryptoFormOpen(true)}>
                    <AddNftBox />
                </section>)
            }
            components.push(<div className={'flex-1 flex-shrink-0'}>
                <FollowingCryptoBox key={i} currency={currency} handleUnfollowCrypto={handleUnfollowCrypto}/>
                </div>
                )
        } else {
            components.push(<section className={'flex-1 flex-shrink-0'} key={i} onClick={() => setIsFollowCryptoFormOpen(true)}>
                <AddNftBox />
            </section>)

        }
    }
    return components
}, [followingCryptos])

    return <div className={'flex items-center justify-center h-full py-5'}>
        <main className={'relative'}>
            {isNftModalOpen && <Modal handleClose={() => setIsNftModalOpen(false)} >
                <NftFolderCreation />
            </Modal>}
            <div className={'grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-5'}>
            <aside className={'px-4 py-5 rounded border border-amber-50 hover:border-amber-50 max-w-lg h-full'}>
                {!!accountData?.wallet_activity?.length ? <>
                        <h2 className={'text-amber-50'}>Recent Transaction</h2>
                        {transactions}
                    </> : <p>No recent transaction</p>}
            </aside>
            <aside>
                <h2 className={'text-xl mb-3'}>Nft Galleries</h2>
                <div  className={'flex flex-col justify-between h-full'}>
                    {recentGalleries()}
                </div>
            </aside>
            </div>
            <aside className={'mt-5 flex-shrink-0'}>
                <h2 className={'text-xl mb-3'}>Following Tokens</h2>
                <div className={'flex flex-col md:flex-row gap-10'}>
                    {followingCryptosComponents}
                </div>
            </aside>
        </main>
        {isFollowCryptoFormOpen && <Modal handleClose={() => setIsFollowCryptoFormOpen(false)} >
            <FollowCryptoForm handleCloseForm={() => setIsFollowCryptoFormOpen(false)}/>
        </Modal>
        }
    </div>
};