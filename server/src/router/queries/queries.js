const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
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
const {RecentWalletActionType} = require('../bitquery/bitqueryTypes')
const {NftFolderType, UserType} = require('../types/types')
const {TokenType} = require('../alchemy/alchemyTypes')




const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type:  new GraphQLObjectType({
                name: 'Login',
                fields: () => ({
                    user: {type: UserType},
                    token: {type: GraphQLString},
                })
            }),
            args: {
                wallet_address: {type: GraphQLString},
                signature: {type: GraphQLString},
                message: {type: GraphQLString},
            },
            resolve(parent, args, context) {
                return authController.login(parent, args, context);
            },
        },
        auth: {
            type: UserType,
            resolve(parent, args, context) {
                return authController.auth(parent, args, context);
            },
        },
        getUserWalletActivity: {
            type: RecentWalletActionType,
            args: {
                limit: {type: GraphQLInt},
                offset: {type: GraphQLInt},
            },
            resolve(parent, args, context) {
                return userController.getUserWalletActivity(parent, args, context);
            },
        },
        getUserNfts: {
            type: new GraphQLObjectType({
                name: 'UserNfts',
                fields: () => ({
                    ownedNfts: {type: GraphQLList(TokenType)},
                    pageKey: {type: GraphQLString},
                    totalCount: {type: GraphQLInt},
                }),
            }),
            args: {
                pageSize: {type: GraphQLInt},
                pageKey: {type: GraphQLString},
                contractAddresses: {type: GraphQLList(GraphQLString)},
            },
            resolve(parent, args, context) {
                return userController.getUserNfts(parent, args, context);
            },
        },
        getNftData: {
            type: TokenType,
            args: {
                token_id: {type: GraphQLNonNull(GraphQLString)},
                contract_address: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args, context) {
                return userController.getNftData(parent, args, context);
            },
        },
        getUserNftFolders: {
            type: GraphQLList(NftFolderType),
            args: {
                user_id: {type: GraphQLID},
            },
            resolve(parent, args, context) {
                return userController.getUserNftFolders(parent, args, context);
            },
        },
    },
});


module.exports = RootQuery;
// exports.default = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation,
// });