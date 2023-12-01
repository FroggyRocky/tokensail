import {IUserData} from './userTypes'
import {AxiosResponse} from "axios";
import {AuthAPI} from "@api/auth";
import {useUserStore} from "@store/userStore/userStore";
import {unparseGraphQLResponse} from "../../lib/helpers/apiHelpers";

export async function authThunk() {
        const wallet_address = useUserStore.getState().wallet_address
        if (!wallet_address) throw new Error('No wallet address')
        const res: AxiosResponse<IUserData | any> = await AuthAPI.auth(wallet_address)
        const {error, data} = unparseGraphQLResponse(res)
        console.log(error, data)
        if (!error) {
            const userData = res.data
            useUserStore.getState().setUserData(userData)
        } else {
            console.log('ERROR', error)
        }
}