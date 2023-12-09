const nftFoldersModel = require('../model/nftModel');
const {GraphQLError} = require("graphql");
const {errorNames} = require("../../errorTypes");
const nftModel = require("../model/nftModel");
const alchemy = require("../router/alchemy/alchemy");


exports.createNftFolder = async (parent, args, context) => {
    const {user} = await context
    const {name, user_id, tokens} = args;
    if (!user) {
        throw new GraphQLError(errorNames.UNATHORIZED);
    } else if (!name || !user_id) {
        throw new GraphQLError(errorNames.INVALID_DATA);
    }
    return nftFoldersModel.createNftFolder(name, user_id, tokens);
}

exports.addTokenToFolder = async (parent, args, context) => {
    const {user} = await context
    const {folder_id, token_id, contract_address} = args
    if (!user) {
        throw new GraphQLError(errorNames.UNATHORIZED);
    } else if (!folder_id || !token_id) {
        throw new GraphQLError(errorNames.INVALID_DATA);
    }
    return nftFoldersModel.addTokenToFolder(folder_id, token_id, contract_address);
}

exports.getUserFolders = async (parent, args, context) => {
    // const {user} = await context
    // if (!user) {
    //     throw new GraphQLError(errorNames.UNATHORIZED);
    // }
    const res = nftFoldersModel.getAllUserFolders(1);
    console.log(res)
    return res
}

exports.getUserNftFolders = async (parent, args, context) => {
    const {user_id} = args;
    const {user} = await context
    if (!user && !user_id) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
    return nftModel.getAllUserFolders(user_id || user.id);
}

exports.getUserNfts = async (parent, args, context) => {
    try {
        const {pageKey, pageSize, contractAddresses} = args;
        const {user} = await context
        if (!user) {
            return new GraphQLError(errorNames.UNATHORIZED);
        }
        const wallet_address = user.wallet_address
        // const wallet_address = '0x5bc1076b506b6ff9ff170f722618f9fdbf02de67'
        return await nftModel.getAllUserNfts(wallet_address, contractAddresses, pageKey, pageSize);
    } catch (e) {
        console.log(e)
    }
}

exports.getNftData = async (parent, args, context) => {
    try {
        // '0x21B589e8Ad9EFcd3582eAc5de321d06DeF182E0F', '78601'
        const {token_id, contract_address} = args;
        // const {user} = await context
        // if(!user){
        //     return new GraphQLError(errorNames.UNATHORIZED);
        // }
        return await nftModel.getNftData(token_id, contract_address);
    } catch (e) {
        console.log(e)
    }
}