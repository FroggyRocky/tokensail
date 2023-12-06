import {IUserData} from './userTypes'
import {AxiosResponse} from "axios";
import {AuthAPI} from "@api/auth";
import {useUserStore} from "@store/userStore/userStore";
import {unparseGraphQLResponse} from "../../lib/helpers/apiHelpers";

export async function authThunk() {
        const wallet_address = useUserStore.getState().wallet_address
        if (!wallet_address) throw new Error('No wallet address')
        const res: AxiosResponse<IUserData | any> = await AuthAPI.login(wallet_address)
        const {error, data} = unparseGraphQLResponse(res)
        if (!error) {
            const userData = data.login
            useUserStore.getState().setUserData(userData)
        } else {
            console.log('ERROR', error)
        }
}