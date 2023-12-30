const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLScalarType,
    GraphQLInputField
} = require('graphql');
const {UserType, NftFolderType, FolderTokenType, FolderTokenInput} = require('../types/types')
const nftController = require("../../controllers/nftController");
const {GraphQLUpload, } = require('graphql-upload')
const userController = require("../../controllers/userController");

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createNftFolder: {
            type: new GraphQLList(NftFolderType),
            args: {
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                bannerUrl: {type: GraphQLString},
                tokens: {type: new GraphQLList(FolderTokenInput)},
            },
            resolve(parent, args, context) {
                return nftController.createNftFolder(parent, args, context);
            }
        },
        addTokensToFolder: {
            type: new GraphQLList(NftFolderType),
            args: {
                tokens: {type: new GraphQLList(FolderTokenInput)},
                folder_id: {type: GraphQLID},
            },
            resolve(parent, args, context) {
                return nftController.addTokensToFolder(parent, args, context);
            }
        },
        deleteTokenFromFolder: {
            type: new GraphQLList(NftFolderType),
            args: {
                token: {type: FolderTokenInput},
                folder_id: {type: GraphQLID},
            },
            resolve(parent, args, context) {
                return nftController.deleteTokenFromFolder(parent, args, context);
            }
        },
        followCrypto: {
            type: UserType,
            args: {
                crypto: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args, context) {
                return userController.followCrypto(parent, args, context);
            }
        },
        unfollowCrypto: {
            type: UserType,
            args: {
                crypto: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args, context) {
                return userController.unfollowCrypto(parent, args, context);
            }
        },
        changeBannerUrl: {
            type: new GraphQLList(NftFolderType),
            args: {
                folder_id: {type: GraphQLID},
                bannerUrl: {type: GraphQLString},
            },
            resolve(parent, args, context) {
                return nftController.changeBannerUrl(parent, args, context);
            }
        },
        }
})

module.exports = Mutation;