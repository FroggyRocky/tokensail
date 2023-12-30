'use client';
import {Web3Provider} from "@lib/HOCs/Web3Provider";
import {useQuery} from "@apollo/client";
import {useAuthStore} from "@store/authStore/authStore";
import {GET_NFT_FOLDER} from '@api/queries'
import {Loader} from '@UIKit/Loader/Loader'
import GalleryFolder from "@modules/Account/GalleryFolder";
import {NftFolderType} from '@store/accountStore/accountTypes'

type Props = {
    params: {
        id: string
    }
    searchParams: any
};

export default function Page(props: Props) {
    const token = useAuthStore.getState().auth_token
    const {loading, error, data} = useQuery<{ getNftFolder: NftFolderType }>(GET_NFT_FOLDER, {
        variables: {
            id: props.params.id,
        },
        context: {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        },
    })
    console.log(data)
    if (loading || !data) return <Loader/>
    return <Web3Provider>
        <GalleryFolder folder_data={data.getNftFolder} folder_id={props.params.id}/>
    </Web3Provider>
};

