import {GalleryFolders} from '@components/Account/Gallery/GalleryFolders'
import {WithAuth} from "@lib/HOCs/WithAuth";
import {NftFolderType} from "@store/accountStore/accountTypes";

type Props = {
    folder_id: string,
    folders_data: NftFolderType[]
};

function GalleryFoldersModule(props: Props) {
    return <GalleryFolders folders_data={props.folders_data}    />
};

const GalleryFoldersWithAuth = WithAuth(GalleryFoldersModule)
export default GalleryFoldersWithAuth