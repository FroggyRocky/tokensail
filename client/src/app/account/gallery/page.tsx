'use client';
import {useQuery} from "@apollo/client";
import {GET_NFT_FOLDERS} from '@api/queries'
import {useAuthStore} from "@store/authStore/authStore";
import {Loader} from '@UIKit/Loader/Loader'
import {GalleryFolders} from "@components/Account/Gallery/GalleryFolders";
import {NftFolderType} from '@store/accountStore/accountTypes'
type Props = {};

type FolderType = {
    getUserNftFolders: NftFolderType[]
}
export default function Page(props: Props) {
    const token = useAuthStore(state => state.auth_token);
   const {loading, data} = useQuery<FolderType>(GET_NFT_FOLDERS, {
        context: {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }
    });
   if(loading || !data) return <Loader/>
    return <div>
        <GalleryFolders folders_data={data.getUserNftFolders} />
    </div>
};