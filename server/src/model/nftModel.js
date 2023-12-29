const {prisma} = require('../../db/prisma');
const alchemy = require('../router/alchemy/alchemy');

exports.createNftFolder = async (payload, user) => {
    const {tokens, name, description, bannerUrl} = payload
    const {id} = user;
    return prisma.nft_folders.create({
        data: {
            name: name,
            tokens: tokens || [],
            description: description,
            banner_url: bannerUrl,
            user_id: id
        }
    });
}

exports.addTokensToFolder = async (folder_id, tokens, user_id) => {
    const folder = await prisma.nft_folders.findUnique({
      where: {
            id: +folder_id,
            user_id: +user_id
      }
    })
    const updatedTokens = [...folder.tokens, ...tokens]
    return prisma.nft_folders.update({
        where: {
            id: +folder_id,
            user_id: +user_id
        },
        data: {
            tokens: updatedTokens
        }
    });
}

exports.deleteTokenFromFolder = async (folder_id, token_id) => {
    const folder = await prisma.nft_folders.findUnique({
        where: {
            id: folder_id
        }
    })
    const tokens = folder.tokens.filter(token => token.token_id !== token_id);
    return prisma.nft_folders.update({
        where: {
            id: folder_id
        },
        data: {
            tokens: tokens
        }
    });
}

exports.changeBannerUrl = async (folder_id, bannerUrl) => {
    return prisma.nft_folders.update({
        where: {
            id: folder_id
        },
        data: {
            banner_url: bannerUrl
        }
    });
}

exports.getAllUserFolders = async (user_id, pageSize, page) => {
const folders = await prisma.nft_folders.findMany({
    where: {
        user_id: +user_id
    },
});
const modified_folders = await Promise.all(folders.map(async (folder) => {
  const {tokens, ...rest} = folder;
  console.log(tokens)
  const modified_tokens = await Promise.all(tokens.map(async (token) => {
        const {contract_address, token_id} = token;
        const data = await alchemy.nft.getNftMetadata(contract_address, token_id);
        return {...token, data: data}
    }))
    return {...rest, tokens: modified_tokens}
}))
    return modified_folders;
}

exports.getFolderById = async (folder_id) => {
    const folder =  await prisma.nft_folders.findUnique({
        where: {
            id: +folder_id
        }
    });
    const {tokens, ...rest} = folder;
    const modified_tokens = await Promise.all(tokens.map(async (token) => {
        const {contract_address, token_id} = token;
        const data = await alchemy.nft.getNftMetadata(contract_address, token_id);
        return {...token, data: data}
    }))
    return {...rest, tokens: modified_tokens}
}

exports.getAllUserNfts = async (wallet_address, contractAddresses = [], pageKey = '', pageSize = 1) => {
    return await alchemy.nft.getNftsForOwner(wallet_address, {pageSize, pageKey, contractAddresses});
}
exports.getNftData = async (token_id, contract_address) => {
    return await alchemy.nft.getNftMetadata(contract_address, token_id);
}




