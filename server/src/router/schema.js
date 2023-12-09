const {buildSchema} = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');
const RootQuery = require('./queries/queries');
const Mutation = require('./mutations/mutations');


module.exports = module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});