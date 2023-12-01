import {walletAddressType} from "@store/userStore/userTypes";

const Queries = {
    login(wallet_address: walletAddressType) {
        return `query {
            auth(authInput: {wallet_address: "${wallet_address}"}){
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
    getPosts: () => {
        return `query {
            getPosts {
                id
                title
                body
            }
        }`;
    },
    getPost: (id: number) => {
        return `query {
            getPost(id: ${id}) {
                id
                title
                body
            }
        }`;
    },
    createPost: (title: string, body: string) => {
        return `mutation {
            createPost(title: "${title}", body: "${body}") {
                id
                title
                body
            }
        }`;
    },
    updatePost: (id: number, title: string, body: string) => {
        return `mutation {
            updatePost(id: ${id}, title: "${title}", body: "${body}") {
                id
                title
                body
            }
        }`;
    },
    deletePost: (id: number) => {
        return `mutation {
            deletePost(id: ${id}) {
                id
                title
                body
            }
        }`;
    }
}


export {Queries};
