import {walletAddressType} from "@store/userStore/userTypes";

const Queries = {
    login(wallet_address: walletAddressType) {
        return `query {
            login(loginInput: {wallet_address: "${wallet_address}"}){
            id,
            email,
            username,
            nft_folders {
            name,
            tokens,
    }
  }
            }`;
    },

}


export {Queries};
