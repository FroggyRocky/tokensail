import styles from './addNftBox.module.scss'
import { GrGallery } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
type Props = {

};

export function AddNftBox(props: Props) {
    return <div className={styles.addNftBox} >
<div className={styles.addNftBox__content}>
    <IoMdAdd className={styles.addNftBox__addIcon} />
</div>
    </div>
};