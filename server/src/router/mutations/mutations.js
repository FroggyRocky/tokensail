const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLScalarType,
} = require('graphql');
const {UserType, NftFolderType} = require('../types/types')
const nftController = require("../../controllers/nftController");
const {GraphQLUpload, } = require('graphql-upload')
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createNftFolder: {
            type: NftFolderType,
            args: {
                data: {type: GraphQLUpload},
            },
            resolve(_, { data }, context) {
                return nftController.createNftFolder(_, { data }, context);
            }
        },
        addNftToFolder: {
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