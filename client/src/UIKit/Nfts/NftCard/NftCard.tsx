import styles from './nftCard.module.scss'
import {ImageWithLoader} from "@UIKit/ImageWithLoader/ImageWithLoader";
import {useState} from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5"
type Props = {
    id: number
    collectionName: string
    media: string,
    backupMedia?: string,
    handleClick?: (id: number) => void
    isSelected?: boolean
};

export function NftCard(props: Props) {
    const [isImgLoading, setImgLoaderState] = useState<boolean>(true)
    function chooseAsset() {
        if(isImgLoading) return
        if(!props.handleClick) return
        props.handleClick(props.id)
    }
    return <div id={props.id.toString()} className={`${styles.nftCard} ${props.isSelected && styles.nftCard_selected}`} onClick={chooseAsset}>
        <ImageWithLoader backupImgSrc={props.backupMedia ?? undefined} setImgLoaderState={setImgLoaderState} isImgLoading={isImgLoading} imgSrc={props.media}/>
        <p className={styles.nftCard__collectionName}>{props.collectionName}</p>
        {props.isSelected && <IoCheckmarkCircleOutline size={35} className={styles.nftCard__checkmark} />

        }
    </div>
};