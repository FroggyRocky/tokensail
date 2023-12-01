const {buildSchema} = require('graphql');


const schema = buildSchema(`
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
   input authInput {
         wallet_address: String,
   }
    type Query {
        auth(authInput:authInput): User,
    }
`)

module.exports = schema;