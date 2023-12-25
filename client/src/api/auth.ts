import {Queries} from './queries'
import axios, {AxiosResponse} from 'axios'
import {apiBase} from "../../URLs";
import {AccountDataType} from "@store/accountStore/accountTypes";
import {walletAddressType} from "@store/authStore/authTypes";
import {useAuthStore} from "@store/authStore/authStore";
import {isTokenValid} from "../lib/helpers/authHelpers";
import {graphQLResponseType} from "../lib/helpers/apiHelpers";

const axiosConfig = axios.create({
    withCredentials: true,
})

const AuthAPI = {
    async login(wallet_address: walletAddressType, signature: string, signedMsg: string) {
        const res: AxiosResponse<graphQLResponseType<loginResponseType>> = await axiosConfig.post(apiBase, {
            query: Queries.login(wallet_address, signature, signedMsg)
        })
        return res
    },
    async auth() {
        const token = useAuthStore.getState().auth_token
        if (!token.token) throw new Error('No token')
        if (!isTokenValid(token.expiresOn)) throw new Error('Token expired')
        const res: AxiosResponse<graphQLResponseType<{ auth: AccountDataType }>> = await axiosConfig.post(apiBase, {
                query: Queries.auth()
            }, {
                headers: {
                    Authorization: `Bearer ${token.token}`

                }
            }
        )
        return res
    }
}


export {AuthAPI}


type loginResponseType = {
    login: {
        token: string
        user: AccountDataType
    }
}