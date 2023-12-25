import {walletAddressType} from "@store/authStore/authTypes";
import {gql} from "@apollo/client";

const Queries = {
    login(wallet_address: walletAddressType, signature: string, signedMsg: string) {
        return `query {
  login(wallet_address:"${wallet_address}", signature:"${signature}",message:"${signedMsg}") {
    user {
      id,
      wallet_address,
      email,
      username,
    }
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
      isActive
    }
    wallet_activity {
    amount,
      address {
        address
      },
      currency {
        symbol
      }, 
      date {
        date
      }
      type
    }
    nft_folders {
      name,
      tokens {
        data {
          image {
            thumbnailUrl
          }
        }
      }
    }
  }
}`
    }
}


export const GET_ALL_USER_NFTS = gql`
    query GetUserNfts($pageKey: String, $pageSize: Int) {
    getUserNfts(pageKey:$pageKey, pageSize: $pageSize) {
       ownedNfts {
        name,
        tokenId,
         raw {
          metadata {
            name
            image
          }
    }
        contract {
      openSeaMetadata {
        imageUrl
      }
    }
      }
      pageKey,
      totalCount
        }
    }
`




export {Queries};
