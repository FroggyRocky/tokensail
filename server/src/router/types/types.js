const userController = require("../../controllers/userController");
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');
const {TokenType} = require('../alchemy/alchemyTypes')
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        wallet_address: {type: GraphQLString},
        email: {type: GraphQLString},
        username: {type: GraphQLString},
        isActive: {type: GraphQLBoolean},
        nft_folders: {
            type: GraphQLList(NftFolderType),
            resolve(parent, args, context) {
                return userController.getUserNftFolders(parent, args, context);
            }
        },
    }),
});


const NftFolderType = new GraphQLObjectType({
    name: 'NftFolder',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        tokens: {type: GraphQLList(new GraphQLObjectType({
                    name: 'folderTokens',
                    fields: () => ({
                        token_id: {type: GraphQLString},
                        contract_address: {type: GraphQLString},
                        data: {type: TokenType}
                    })
                }))},
        user_id: {type: GraphQLID},
        user: {
            type: UserType,
            resolve(parent, args, context) {
                return userController.getUserData(parent, args, context);
            },
        },
    })
})


module.exports = {
    UserType,
    NftFolderType
}