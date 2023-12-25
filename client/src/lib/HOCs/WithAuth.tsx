'use client';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAccount} from "wagmi";
import {loginThunk} from "@store/authStore/authThunks";
import {useAuthStore} from "@store/authStore/authStore";
import {useSignMessage} from "wagmi";
import {Loader} from "@UIKit/Loader/Loader";

export const WithAuth = (Component:React.ComponentType<any>) => {
    function EnhancedComponent(props: any) {
        const [loading, setLoading] = useState(true)
        const {auth_token} = useAuthStore(state => state)
        const {isConnected, address} = useAccount();
        const {signMessageAsync} = useSignMessage()
        const {push} = useRouter()
        async function auth() {
            try {
                if(!auth_token.token && !isConnected || !address) {
                    await push('/')
                } else if(!auth_token.token && isConnected && address) {
                    const sig_msg = 'Welcome to TokenSail!'
                    const res = await signMessageAsync({message: sig_msg})
                    await loginThunk(res, sig_msg, address)
                }
            } finally {
                setLoading(false)
            }
        }
        useEffect(  () => {
             auth().then(() => {})
        }, [])
        if(loading) return <Loader />
        return <> <Component {...props} /></>
    }
    return EnhancedComponent
};