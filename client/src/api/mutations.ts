import {gql} from "@apollo/client";



export const CREATE_NFT_FOLDER = gql`
    mutation CreateNFTFolder($data: Upload) {
        createNftFolder(data: $data) {
            id
            name
        }
    }
`