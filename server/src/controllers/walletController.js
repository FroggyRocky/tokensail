const axios = require("axios");
const {addressActions} = require("../router/bitquery/bitqueries");
const walletModel = require('../model/walletModel')
const {GraphQLError} = require('graphql')
const {errorNames} = require('../../errorTypes')


exports.getUserWalletActivity = async (parent, args, context) => {
    const {user, isAuth} = await context;
    const {limit, page} = args;
    const offset = limit * page;
    if(!user || !user.id){
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    return walletModel.getWalletInflowsOutflows({limit, offset, user})
}

exports.getAllWalletHistory = async (parent, args, context) => {
    const {user} = await context;
    const {limit, offset} = args;
    if(!user || !user.id){
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    const data =  walletModel.getWalletHistory({limit, offset, user})
    return {
        history: data,
        count: data.length
    }
}












