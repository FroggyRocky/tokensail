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
        <div className={'relative bg-secondary bg-cover bg-center min-h-screen flex flex-col flex-grow'} style={{backgroundImage: `url(${bg.src})`}}>
            <div className={'absolute top-0 left-0 w-full z-5 opacity-70 bg-black h-full'}></div>
            <main className={'relative z-10 min-h-screen flex flex-col'}>
                <AccountHeader />
                <div className={'flex-grow px-5 h-full flex flex-col items-center justify-center'}>
                    {props.children}
                    </div>
                <Footer/>
            </main>
        </div>
    </Web3Provider>
};