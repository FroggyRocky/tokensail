const axios = require('axios')
const {addressActions, addressNfts} = require('../router/bitquery/bitqueries')
const {GraphQLError} = require('graphql')
const {errorNames} = require('../../errorTypes')
const userModel = require('../model/userModel')
const nftModel = require('../model/nftModel')
const alchemy = require('../router/alchemy/alchemy')


exports.getUserData = async (parent, args, context) => {
    const {user} = await context
    if (!user) {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    return user
}
exports.followCrypto = async (parent, args, context) => {
    const ALLOWED_VALUES = ['ETH', 'BTC', 'USDT']
    const {user} = await context
    if (!user || !user.id) {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    if (!args.crypto || !ALLOWED_VALUES.includes(args.crypto)) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
    return userModel.followCrypto(user.id, args)
}
exports.unfollowCrypto = async (parent, args, context) => {
    const ALLOWED_VALUES = ['ETH', 'BTC', 'USDT']
    const {user} = await context
    if (!user || !user.id) {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    if (!args.crypto || !ALLOWED_VALUES.includes(args.crypto)) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
    return userModel.unfollowCrypto(user.id, args)
}
exports.changeUserData = async (parent, args, context) => {
    const {user} = await context
    if (!user) {
        return new GraphQLError(errorNames.UNATHORIZED);
    } else if (!changeUserDataInput) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
    return userModel.changeUserData(user.id, args);
}






