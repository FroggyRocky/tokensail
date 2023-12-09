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

exports.changeUserData = async (parent, args, context) => {
    const {user} = await context
    if (!user) {
        return new GraphQLError(errorNames.UNATHORIZED);
    } else if (!changeUserDataInput) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
    return userModel.changeUserData(user.id, args);
}

exports.getUserWalletActivity = async (parent, args, context) => {
    try {
        const {limit, offset} = args;
        // const {user} = await context
        // if(!user){
        //     return new GraphQLError(errorNames.UNATHORIZED);
        // }
        const res = await axios.post('https://graphql.bitquery.io', {
            query: addressActions,
            variables: {
                "limit":limit || 6,
                "offset":offset || 0,
                "network": "ethereum",
                address: '0xCdAA125746a670996c4D6d76D9BE35dd53E13ba9',
                // "address": user?.wallet_address || '0xCdAA125746a670996c4D6d76D9BE35dd53E13ba9',
                "dateFormat": "%Y-%m-%d"
            }
        }, {
            headers: {
                "X-API-KEY": process.env.BITQUERY_API_KEY
            }
        })
        console.log(JSON.stringify(res.data))
        return res.data.data
    } catch (e) {
        console.log(e)
    }
}




