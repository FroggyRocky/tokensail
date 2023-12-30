import {useAuthStore} from "@store/authStore/authStore";
import {AxiosResponse} from "axios";
import {AuthAPI} from "@api/auth";
import {unparseGraphQLResponse} from "@lib/helpers/apiHelpers";
import {IAuthStore, walletAddressType} from "@store/authStore/authTypes";
import {isTokenValid} from "@lib/helpers/authHelpers";
import {useAccountStore} from "@store/accountStore/accountStore";

export async function loginThunk(signature: string, signedMsg: string, wallet: walletAddressType | null = null) {
    const token = useAuthStore.getState().auth_token
    const setAuthToken = useAuthStore.getState().setAuthToken
    if (token.token && isTokenValid(token.expiresOn)) {
        await authThunk()
    }
    const wallet_address = useAuthStore.getState().wallet_address || wallet
    if (!wallet_address) throw new Error('No wallet address')
    const res = await AuthAPI.login(wallet_address, signature, signedMsg)
    const {error, data} = unparseGraphQLResponse(res)
    if (!error) {
        setAuthToken(data.login.token)
        await authThunk()
    } else {
        console.log('ERROR', error)
    }
}

export async function authThunk() {
    const setAccountData = useAccountStore.getState().setAccountData
    const setFollowingCryptos = useAccountStore.getState().setFollowingCryptos
    try {
        const res = await AuthAPI.auth()
        const {error, data} = unparseGraphQLResponse(res)
        if (!error) {
            setAccountData(data.auth)
            setFollowingCryptos(data.auth.user?.following_cryptos || [])
        } else {
            console.log('ERROR', error)
        }
    } catch (e) {
        console.log(e)
    }
}