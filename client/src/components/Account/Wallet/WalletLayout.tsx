import {Footer} from "@components/Landing/Footer/Footer";
import {AccountHeader} from "@components/Account/AccountHeader/AccountHeader";
import React from 'react'
import bg from "@assets/landing/background.png";

type Props = {
    current_filter: 'inflow' | 'outflow' | 'all'
    handleAddressSearchChange: (e: any) => void
    handleFilterChange: React.Dispatch<React.SetStateAction<'inflow' | 'outflow' | 'all'>> | ((value: 'inflow' | 'outflow' | 'all') => void)
    children: React.ReactNode
};

export function WalletLayout(props: Props) {
    return <div className={'bg-secondary bg-cover bg-center min-h-screen flex flex-col flex-grow'} style={{backgroundImage: `url(${bg.src})`}}>
        <div className={'absolute top-0 left-0 w-full z-5 opacity-70 bg-black h-full'}></div>
        <AccountHeader />
        <div className={'px-5 py-10 relative z-10 flex-grow'}>
        <header className={'flex items-center justify-between border-b py-5'}>
            <h1 className={'text-3xl font-bold dark:text-white flex-wrap'}>Wallet</h1>
            <div className={'flex items-center'}>
                <button onClick={() => props.handleFilterChange('inflow')}
                        className={`${props.current_filter === 'inflow' && 'border-link text-white font-bold'} text-link bg-transparent border border-text hover:border-link text-white font-bold py-2 px-4 rounded`}>
                    Inflow
                </button>
                <button onClick={() => props.handleFilterChange('outflow')}
                        className={`${props.current_filter === 'outflow' && 'border-link text-white font-bold'} mx-4 text-link bg-transparent border border-text hover:border-link text-white font-bold py-2 px-4 rounded`}>
                    Outflow
                </button>
                <button onClick={() => props.handleFilterChange('all')}
                        className={`${props.current_filter === 'all' && 'border-link text-white font-bold'} text-link bg-transparent border border-text hover:border-link text-white font-bold py-2 px-4 rounded`}>
                    All
                </button>
            </div>
                <input
                    className={'border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                    placeholder={'To or From Address'} onChange={props.handleAddressSearchChange}/>
        </header>
        <section className={'mt-10'}>
            {props.children}
        </section>
        </div>
        <Footer />
    </div>
};