import {AxiosError, AxiosResponse} from "axios";


export type graphQLResponseType<T> = {
    errors?: Array<{message: string, statusCode: number}>
    data?: T
}

export function unparseGraphQLResponse(res: AxiosResponse<graphQLResponseType<any>>) {
    if(res.data.errors) {
        return {
            error:res.data.errors[0],
            data:null
        }
    } else {
        return {
            error: null,
            data: res.data.data
        }
    }
}