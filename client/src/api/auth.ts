import {Queries} from './queries'
import axios, {AxiosResponse} from 'axios'
import {apiBase} from "../../URLs";
import {IUserData, walletAddressType} from "@store/userStore/userTypes";
import {useUserStore} from "@store/userStore/userStore";

const axiosConfig = axios.create({
    withCredentials: true,

})

const AuthAPI = {
    async login(wallet_address: walletAddressType) {
        const wallet = useUserStore.getState().wallet_address
        const res: AxiosResponse<IUserData> = await axiosConfig.post(apiBase, {
            query: Queries.login(wallet_address)
        }, {
            headers: {
                Authorization: wallet
            }
        })
        return res
    },
}


export {AuthAPI}