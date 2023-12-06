'use client';
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {OutlinedBtn} from '@UIKit/OutlinedBtn/OutlinedBtn';
import {useAccount} from 'wagmi'
import {useEffect, useState} from "react";
import {useUserStore} from "@store/userStore/userStore";
import Link from 'next/link'
import {authThunk} from "@store/userStore/userThunks";

type Props = {

};

export function Intro(props: Props) {
    const {openConnectModal } = useConnectModal();
    const setWallet = useUserStore.getState().setWalletAddress
    const {isConnected, address} = useAccount();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if(isConnected && address) {
            setWallet(address)
            authThunk().then(()=>{
                setIsMounted(true)
            }).catch((e)=>{
                console.log(e)
            })
        } else {
            setIsMounted(true)
        }
    }, [address, isConnected])
    return <div className={'px-5 py-12 flex flex-col justify-center items-center grow h-full'}>
    <main className={'flex items-center justify-center flex-col'}>
        <h1 className={'mb-20 font-bold text-4xl leading-relaxed tracking-widest text-center'}>Chart Your Course with TokenSail <br/> Harness the Power of Gate Watcher!</h1>
        {isMounted && <div className={'w-80'} >
            {address && <Link href={'/account'}><OutlinedBtn text={'Personal Account'} /></Link>}
            {!address && <OutlinedBtn text={'Connect Wallet'} onClick={openConnectModal}/>}
        </div>}
    </main>
    </div>
};