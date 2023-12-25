'use client';
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {OutlinedBtn} from '@UIKit/OutlinedBtn/OutlinedBtn';
import {useAccount, useSignMessage} from 'wagmi'
import {useEffect, useState} from "react";
import Link from 'next/link'
import {authThunk, loginThunk} from "@store/authStore/authThunks";
import {useAuthStore} from "@store/authStore/authStore";
import {isTokenValid} from "../../../lib/helpers/authHelpers";

type Props = {};

export function Intro(props: Props) {
    const {openConnectModal} = useConnectModal();
    const auth_token = useAuthStore(state => state.auth_token)
    const {isConnected, address} = useAccount();
    const [isMounted, setIsMounted] = useState(false)
    const {signMessageAsync} = useSignMessage()
    async function handleAuth() {
        if (isConnected && address) {
            if (auth_token.token && isTokenValid(auth_token.expiresOn)) {
                await authThunk()
            } else {
                const sig_msg = 'Welcome to TokenSail!'
                const res = await signMessageAsync({message: sig_msg})
                await loginThunk(res, sig_msg, address)
            }
        } else {
            setIsMounted(true)
        }
    }

    useEffect(() => {
        handleAuth().finally(() => {
            setIsMounted(true)
        })
    }, [address, isConnected])


    return <div className={'px-5 py-12 flex flex-col justify-center items-center grow h-full'}>
        <main className={'flex items-center justify-center flex-col'}>
            <h1 className={'mb-20 font-bold text-4xl leading-relaxed tracking-widest text-center'}>Chart Your Course
                with TokenSail <br/> Harness the Power of Gate Watcher!</h1>
            {isMounted && <div className={'w-80'}>
                {address ? <Link href={'/account'}><OutlinedBtn text={'Personal Account'}/></Link> :
                    <OutlinedBtn text={'Connect Wallet'} onClick={openConnectModal}/>}
            </div>
            }
        </main>
    </div>
};