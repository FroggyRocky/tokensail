import {Queries} from './queries'
import axios, {AxiosResponse} from 'axios'
import {apiBase} from "../../URLs";
import {IUserData, walletAddressType} from "@store/userStore/userTypes";

const AuthAPI = {
    async auth(wallet_address: walletAddressType) {
        const res: AxiosResponse<IUserData> = await axios.post(apiBase, {
            query: Queries.login(wallet_address)
        })
        return res
    }
}


export {AuthAPI}