const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');
const {UserType, NftFolderType} = require('../types/types')
const nftController = require("../../controllers/nftController");

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createNftFolder: {
            type: NftFolderType,
            args: {
                name: {type: GraphQLString},
                user_id: {type: GraphQLID},
            },
            resolve(parent, args, context) {
                return nftController.createNftFolder(parent, args, context);
            }
        },
        addTokenToFolder: {
            type: NftFolderType,
            args: {
                token_id: {type: GraphQLString},
                user_id: {type: GraphQLID},
                folder_id: {type: GraphQLID},
            },
            resolve(parent, args, context) {
                return nftController.addTokenToFolder(parent, args, context);
            }
        },
    }
})

module.exports = Mutation;