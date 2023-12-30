import {walletAddressType} from "@store/authStore/authTypes";
import {gql} from "@apollo/client";


export const nftTokenPreviewData = 'name,tokenId,raw {metadata {name,image}},contract {address,openSeaMetadata {imageUrl}}'
export const walletActivityData = 'amount,address {address},currency {symbol},date {date}'
export const walletAllHistoryData = 'amount,address {address},currency {symbol},date {date},type'
const Queries = {
    login(wallet_address: walletAddressType, signature: string, signedMsg: string) {
        return `query {
  login(wallet_address:"${wallet_address}", signature:"${signature}",message:"${signedMsg}") {
    token {
    token,
    expiresOn,
    }
  }
}`;
    },
    auth() {
        return `query {
   auth {
    user {
      id,
      email,
      username,
      username,
      isActive,
      following_cryptos
    }
    wallet_activity {${walletAllHistoryData}},
    nft_folders {
      name,
      id,
      description,
        banner_url,
        
      tokens {
      contract_address,
      token_id
        data {${nftTokenPreviewData}}
      }
    }
  }
}`
    },
}


export const GET_ALL_USER_NFTS = gql`
    query GetUserNfts($pageKey: String, $pageSize: Int) {
    getUserNfts(pageKey:$pageKey, pageSize:$pageSize) {
       ownedNfts {${nftTokenPreviewData}},
      pageKey,
      totalCount
        }
    }
`

export const GET_NFT_FOLDER = gql`
    query GetNftFolder($id: ID!) {
    getNftFolder(folder_id:$id) {
      id,
      name,
      tokens {
        token_id,
        data {${nftTokenPreviewData}}
      }
    }
    }
`

export const GET_NFT_FOLDERS = gql`
    query GetUserNftFolders {
    getUserNftFolders {
      id,
      name,
      tokens {
        token_id,
        data {${nftTokenPreviewData}}
      }
    }
    }
`
export const GET_USER_WALLET_INFLOW_OUTFLOW = gql`
query ($limit: Int!, $page: Int!) {
  getUserWalletActivity(limit:$limit, page:$page) {
      outflow {${walletActivityData}},
        inflow {${walletActivityData}},
        outflowCount,
        inflowCount
    }
  }
`

export const GET_USER_WALLET_HISTORY = gql`
query ($limit: Int!, $page: Int!) {
  getAllWalletHistory(limit:$limit, page:$page) {
      history {${walletAllHistoryData}},
      count
    }
  }
`
export {Queries};
