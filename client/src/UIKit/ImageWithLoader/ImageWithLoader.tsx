import styles from './imageWithLoader.module.scss';
import {BiLoaderAlt} from "react-icons/bi";
import {useCallback, useRef} from "react";

type Props = {
    imgSrc: string
    isImgLoading: boolean
    setImgLoaderState: React.Dispatch<React.SetStateAction<boolean>>;
    backupImgSrc?: string
};

export function ImageWithLoader(props: Props) {
const imgRef = useRef<HTMLImageElement>(null)
    const setImg = useCallback(() => {
        if(!props.imgSrc) {
            return props.backupImgSrc
        }
        if(props.imgSrc.includes('ipfs')) {
            return `https://ipfs.io/ipfs/${props.imgSrc.slice('ipfs://'.length)}`
        } else {
            return props.imgSrc
        }
    }, [props.imgSrc, props.isImgLoading])
function handleImgError() {
        if(!props.backupImgSrc || !imgRef.current) return
        imgRef.current.src = props.backupImgSrc
}
    return <div className={`${styles.imageWithLoader} ${props.isImgLoading && styles.imageWithLoader_loading}`}>
        {props.isImgLoading && <BiLoaderAlt className={styles.imageWithLoader__loader}/>}
        {!props.imgSrc && !props.backupImgSrc ? <h2 className={'text-center'}>No media</h2> : <img ref={imgRef} className={`${styles.imageWithLoader__img} ${props.isImgLoading && styles.imageWithLoader__img_loading}`}
             src={setImg()} alt="image" onLoad={() => props.setImgLoaderState(false)} onError={handleImgError}  /> }
    </div>

}