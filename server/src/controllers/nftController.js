const nftFoldersModel = require('../model/nftModel');
const nftModel = require("../model/nftModel");
const alchemy = require("../router/alchemy/alchemy");
const {GraphQLError} = require('graphql')
const {errorNames} = require('../../errorTypes')

exports.createNftFolder = async (parent, args, context) => {
    try {
        const {user} = await context
        const {name, tokens} = args;
        if (!user) {
            return new GraphQLError(errorNames.UNATHORIZED);
        } else if (!name || tokens.length === 0) {
            return new GraphQLError(errorNames.INVALID_DATA);
        }
        await nftFoldersModel.createNftFolder(args, user);
        const res = await nftFoldersModel.getAllUserFolders(user.id);
        console.log('create folder', res)
        return res
    } catch (e) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
}

exports.addTokensToFolder = async (parent, args, context) => {
    const {user, isAuth} = await context
    const {folder_id, tokens} = args
    if (!isAuth) {
        return new GraphQLError(errorNames.UNATHORIZED);
    } else if (!folder_id) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
    try {
        await nftFoldersModel.addTokensToFolder(folder_id, tokens, user.id);
    } catch (e) {
        console.log(e)
        return new GraphQLError(errorNames.INVALID_DATA);
    }
}

exports.deleteTokenFromFolder = async (parent, args, context) => {
    const {isAuth} = await context
    const {user} = await context
    const {folder_id, token_id} = args
    if (!isAuth) {
        return new GraphQLError(errorNames.UNATHORIZED);
    } else if (!folder_id || !token_id) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
    await nftFoldersModel.deleteTokenFromFolder(folder_id, token_id);
    return await nftFoldersModel.getAllUserFolders(user.id);
}

exports.changeBannerUrl = async (parent, args, context) => {
    const {isAuth} = await context
    const {user} = await context
    const {folder_id, bannerUrl} = args
    if (!isAuth) {
        return new GraphQLError(errorNames.UNATHORIZED);
    } else if (!folder_id || !bannerUrl) {
        return new GraphQLError(errorNames.INVALID_DATA);
    }
    await nftFoldersModel.changeBannerUrl(folder_id, bannerUrl);
    return await nftFoldersModel.getAllUserFolders(user.id);
}

exports.getUserNftFolders = async (parent, args, context) => {
    const {isAuth, user} = await context
    if (!isAuth || !user.id) {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    return await nftFoldersModel.getAllUserFolders(user.id);
}

exports.getNftFolder = async (parent, args, context) => {
    const {isAuth} = await context
    if (!isAuth) {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    const {folder_id} = args
    return await nftFoldersModel.getFolderById(folder_id);
}

exports.getUserNfts = async (parent, args, context) => {
    try {
        const {pageKey, pageSize, contractAddresses} = args;
        const {user} = await context
        if (!user) {
            return new GraphQLError(errorNames.UNATHORIZED);
        }
        const wallet_address = user.wallet_address
        const data = await nftModel.getAllUserNfts(wallet_address, contractAddresses, pageKey, pageSize);
        // for(let i = 0; i < data.ownedNfts.length; i++) {
        //     console.log(data.ownedNfts[i].contract.openSeaMetadata)
        // }
        return data
    } catch (e) {
        console.log(e)
    }
}

exports.getNftData = async (parent, args, context) => {
    try {
        const {isAuth} = await context
        if (!isAuth) {
            return new GraphQLError(errorNames.UNATHORIZED);
        }
        const {token_id, contract_address} = args;
        return await nftModel.getNftData(token_id, contract_address);
    } catch (e) {
        console.log(e)
    }
}

