'use client';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAccount} from "wagmi";
import {authThunk, loginThunk} from "@store/authStore/authThunks";
import {useAuthStore} from "@store/authStore/authStore";
import {signMessage} from "wagmi/actions";

import {Loader} from "@UIKit/Loader/Loader";
import {isTokenValid} from "@lib/helpers/authHelpers";

export const WithAuth = (Component: React.ComponentType<any>) => {
    function EnhancedComponent(props: any) {
        const [loading, setLoading] = useState(true)
        const {auth_token, setAuthToken, setWalletAddress} = useAuthStore(state => state)
        const {isConnected, address, connector} = useAccount();
        const {push} = useRouter()

        async function auth() {
            try {
                if (!auth_token.token && !isConnected || !address) {
                    await push('/')
                } else if (!auth_token.token && isConnected && address) {
                    setWalletAddress(address)
                    const sig_msg = 'Welcome to TokenSail!'
                    const res = await signMessage({message: sig_msg})
                    await loginThunk(res, sig_msg, address)
                } else if (auth_token.token && !isTokenValid(auth_token.expiresOn)) {
                    setAuthToken({token: '', expiresOn: ''})
                    await push('/')
                } else {
                    await authThunk()
                }
            } finally {
                setLoading(false)
            }
        }

        useEffect(() => {
            if (!connector) return
            auth().then(() => {
            })
        }, [connector])
        if (loading) return <Loader/>
        return <> <Component {...props} /></>
    }

    return EnhancedComponent
};