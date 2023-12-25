import styles from './loader.module.scss'



export function Loader() {
    return <div className={styles.loader}>
        <div className={styles.loader__planet}></div>
    </div>
};