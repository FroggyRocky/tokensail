const {buildSchema} = require('graphql');


const schema = buildSchema(`
scalar JSON
    type NftFolder {
    id: ID,
    name: String,
    tokens:[String],
    user_id: ID,
    },
    type User {
        id: ID,
        wallet_address: String,
        email: String,
        username: String,
        isActive: Boolean,
        nft_folders: [NftFolder],
   } 
   input loginInput {
         wallet_address: String,
   }
   input createNftFolderInput {
            name: String!,
            user_id: ID!,
            tokens:[String],
   }
   input addTokenToFolderInput {
               folder_id: ID!,
               user_id: ID!,
               token_id: String!,
   }
    type Query {
        login(loginInput:loginInput): User,
         auth: User,
         getUserFolders: [NftFolder],
         getUserTopActions:JSON,
    }
    type Mutation {
    createNftFolder(createNftFolderInput:createNftFolderInput): NftFolder,
    addTokenToFolder(addTokenToFolderInput:addTokenToFolderInput): NftFolder,
    }
`)

module.exports = schema;