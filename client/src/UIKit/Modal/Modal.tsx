import { IoMdClose } from "react-icons/io";
type Props = {
children: React.ReactNode
    handleClose: () => void
};

export function Modal(props: Props) {
    return <div className={'absolute w-full h-full left-0 z-10 flex items-center justify-center'}>
        <div className={'absolute w-full h-full left-0 z-10 bg-black opacity-90'}></div>
        <section className={'relative z-20 w-7/12 h-5/6 border-b-gray-700 bg-opacity-5 overflow-auto bg-scroll border-4 rounded py-3'}>
            <IoMdClose size={25} className={'text-text cursor-pointer ml-auto sticky top-0 right-0'} onClick={props.handleClose} />
            <aside className={'text-text mt-3 mx-4'}>
            {props.children}
            </aside>
        </section>
    </div>
};