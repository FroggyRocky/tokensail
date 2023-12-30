import {GalleryFolder} from '@components/Account/Gallery/GalleryFolder'
import {WithAuth} from "@lib/HOCs/WithAuth";
import {NftFolderType} from "@store/accountStore/accountTypes";

type Props = {
    folder_id: string,
    folder_data: NftFolderType
};

function GalleryFolderModule(props: Props) {
    return <GalleryFolder folder_id={props.folder_id} folder_data={props.folder_data}   />
};

const GalleryFolderWithAuth = WithAuth(GalleryFolderModule)
export default GalleryFolderWithAuth