'use client';
import {Header} from "@components/Landing/Header/Header";
import {Footer} from "@components/Landing/Footer/Footer";
import {Web3Provider} from "../../lib/HOCs/Web3Provider";
import bg from '@assets/landing/background.png'
import {NavMenu} from "@components/Account/NavMenu/NavMenu";
import {AccountHeader} from "@components/Account/AccountHeader/AccountHeader";

type Props = {
    children: React.ReactNode
};

export function AccountLayout(props: Props) {
    return <Web3Provider>
        <div className={'bg-secondary bg-cover bg-center h-screen'} style={{backgroundImage: `url(${bg.src})`}}>
            <div className={'absolute top-0 left-0 w-full h-screen z-5 opacity-70 bg-black'}></div>
            <main className={'relative z-10 h-full flex flex-col'}>
                <AccountHeader />
                <div className={'flex-grow px-5 mt-5'}>
                    {props.children}
                    </div>
                <Footer/>
            </main>
        </div>
    </Web3Provider>
};