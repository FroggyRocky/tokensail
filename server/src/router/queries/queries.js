const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const nftController = require('../../controllers/nftController')
const walletController = require('../../controllers/walletController')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLInt,
    GraphQLBoolean, Token
} = require('graphql');
const {WalletInflowsOutflowsType, UserWalletHistoryType} = require('../bitquery/bitqueryTypes')
const {NftFolderType, UserType, JWTType} = require('../types/types')
const {TokenType} = require('../alchemy/alchemyTypes')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: new GraphQLObjectType({
                name: 'Login',
                fields: () => ({
                    token: {type: JWTType},
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
            type: new GraphQLObjectType({
                name: 'Auth',
                args: {
                    folders_limit: {type: GraphQLInt},
                },
                fields: () => ({
                    user: {type: UserType},
                    nft_folders: {type: new GraphQLList(NftFolderType)},
                    wallet_activity: {type: new GraphQLList(UserWalletHistoryType)},
                })
            }),
            resolve(parent, args, context) {
                return authController.auth(parent, args, context);
            },
        },
        getUserWalletActivity: {
            type: WalletInflowsOutflowsType,
            args: {
                limit: {type: GraphQLInt},
                page: {type: GraphQLInt},
            },
            resolve(parent, args, context) {
                return walletController.getUserWalletActivity(parent, args, context);
            },
        },
        getAllWalletHistory: {
            type: new GraphQLObjectType({
                name: 'GetAllWalletHistoryType',
                fields: () => ({
                    history: {type: new GraphQLList(UserWalletHistoryType)},
                    count: {type: GraphQLInt},
                }),
            }),
            args: {
                limit: {type: GraphQLInt},
                page: {type: GraphQLInt},
            },
            resolve(parent, args, context) {
                return walletController.getAllWalletHistory(parent, args, context);
            },
        },
        getUserNfts: {
            type: new GraphQLObjectType({
                name: 'UserNfts',
                fields: () => ({
                    ownedNfts: {type: new GraphQLList(TokenType)},
                    pageKey: {type: GraphQLString},
                    totalCount: {type: GraphQLInt},
                }),
            }),
            args: {
                pageSize: {type: GraphQLInt},
                pageKey: {type: GraphQLString},
                contractAddresses: {type: new GraphQLList(GraphQLString)},
            },
            resolve(parent, args, context) {
                return nftController.getUserNfts(parent, args, context);
            },
        },
        getNftData: {
            type: TokenType,
            args: {
                token_id: {type: new GraphQLNonNull(GraphQLString)},
                contract_address: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args, context) {
                return nftController.getNftData(parent, args, context);
            },
        },
        getUserNftFolders: {
            type: new GraphQLList(NftFolderType),
            args: {
                pageSize: {type: GraphQLInt},
                pageKey: {type: GraphQLString}
            },
            resolve(parent, args, context) {
                return nftController.getUserNftFolders(parent, args, context);
            },
        },
        getNftFolder: {
            type: NftFolderType,
            args: {
                folder_id: {type: GraphQLID},
            },
            resolve(parent, args, context) {
                return nftController.getNftFolder(parent, args, context);
            },
        },
    },
});


module.exports = RootQuery;
// exports.default = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation,
// });