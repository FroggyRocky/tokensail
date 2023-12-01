import styles from './outlinedBtn.module.scss'
type Props = {
    isDisabled?: boolean
    type?: "button" | "submit" | "reset"
    onClick?: () => void
    text: string
    width?: string
    height?: string
};

export function OutlinedBtn(props: Props) {
    function handleClick() {
        if (props.onClick !== undefined) {
            props.onClick();
        }
        return;
    }

    return <button className={styles.outlinedBtn} type={props.type ?? 'button'}
                   disabled={props.isDisabled ?? false} onClick={handleClick}>
        <span>{props.text}</span>
    </button>
};