import {AxiosError, AxiosResponse} from "axios";


type graphQLResponseType = {
    errors: Array<{message: string, statusCode: number}>
    data: any
}

export function unparseGraphQLResponse(res: AxiosResponse<graphQLResponseType>) {
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