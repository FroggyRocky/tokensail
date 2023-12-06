'use client';
import {useEffect, useState} from "react";
import {useUserStore} from "@store/userStore/userStore";
import {useRouter} from "next/navigation";
import {useAccount} from "wagmi";
import {authThunk} from "@store/userStore/userThunks";



export const WithAuth = (Component:React.ComponentType<any>) => {
    function EnhancedComponent(props: any) {
        const [loading, setLoading] = useState(true)
        const {userData:user, setWalletAddress} = useUserStore(state => state)
        const {isConnected, address} = useAccount();
        const {push} = useRouter()
        async function auth() {
            try {
                if(!user && !isConnected || !address) {
                    await push('/')
                } else if(!user && isConnected && address) {
                    setWalletAddress(address)
                    await authThunk()
                }
            } finally {
                setLoading(false)
            }
        }
        useEffect(  () => {
             auth().then(() => {})
        }, [])
        if(loading) return <div>Loading...</div>
        return <> <Component {...props} /></>
    }
    return EnhancedComponent
};