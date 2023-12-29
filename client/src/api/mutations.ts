import {gql} from "@apollo/client";
import {nftTokenPreviewData} from './queries'

export const CREATE_NFT_FOLDER = gql`
    mutation CreateNFTFolder($name: String!, $description: String, $bannerUrl: String, $tokens: [FolderTokenInput]!) {
        createNftFolder(name: $name, description: $description, bannerUrl: $bannerUrl, tokens: $tokens) {
            id
            name
            description
            banner_url
            tokens {
            token_id,
            contract_address,
            data {${nftTokenPreviewData}}
            }
    } 
    }
`

export const ADD_TOKENS_TO_FOLDER = gql`
    mutation AddTokensToFolder($folderId: ID!, $tokens: [FolderTokenInput]!) {
        addTokensToFolder(folder_id: $folderId, tokens: $tokens) {
            id
            name
            description
            banner_url
            tokens {
            token_id,
            contract_address,
            data {${nftTokenPreviewData}}
            }
    } 
    }
`

export const REMOVE_TOKEN_FROM_FOLDER = gql`
    mutation RemoveTokenFromFolder($folderId: ID!, $token: FolderTokenInput!) {
        removeTokenFromFolder(folder_id: $folderId, token: $token) {
            id
            name
            description
            banner_url
            tokens {
            token_id,
            contract_address,
            data {${nftTokenPreviewData}}
            }
    } 
    }
`




