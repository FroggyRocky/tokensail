import {AccountHeader} from "@components/Account/AccountHeader/AccountHeader";
import {Footer} from "@components/Landing/Footer/Footer";

type Props = {
    children: React.ReactNode
    handleSearchChange: (e: any) => void
    folder_name?: string
    folder_id?: string
    handleAddClick: () => void
} | {
    children: React.ReactNode
    handleSearchChange: (e: any) => void
    folder_name: string
    folder_id: string
    handleAddClick: () => void
};

export function GalleryLayout(props: Props) {

    return <div className={'h-screen flex flex-col'}>
        <AccountHeader/>
        <section className={'px-5 flex-grow'}>
        <header className={'flex justify-between items-center my-5 border-b py-5'}>
            <h1 className={'text-3xl font-bold dark:text-white'}>{props.folder_name ? props.folder_name : 'Gallery'}</h1>
            <input
                className={'border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                placeholder={'Search by name'} onChange={props.handleSearchChange}/>
            <button onClick={props.handleAddClick}
                className="text-link bg-transparent border border-text hover:border-link text-white font-bold py-2 px-4 rounded">
                {props.folder_name ? "+ Add token" : "+ Add Folder"}
            </button>
        </header>
            {props.children}
        </section>
        <Footer/>

    </div>
};