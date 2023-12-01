import {AxiosError, AxiosResponse} from "axios";


type graphQLResponseType = {
    errors: Array<{message: string, statusCode: number}>
    data: any
}

export function unparseGraphQLResponse(res: AxiosResponse<graphQLResponseType>) {
    return {
        error:res.data.errors[0],
        data:res.data.data
    }
}