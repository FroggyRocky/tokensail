const {prisma} = require('../../db/prisma');
const alchemy = require('../router/alchemy/alchemy');

exports.createNftFolder = async (name, user_id, tokens) => {
    return prisma.nft_folders.create({
        data: {
            name: name,
            user_id: user_id,
            tokens: tokens || [],
        }
    });
}

exports.addTokenToFolder = async (folder_id, token_id, contract_address) => {
    return prisma.nft_folders.update({
        where: {
            id: folder_id
        },
        data: {
            tokens: {
                push: {
                    token_id: token_id,
                    contract_address: contract_address
                }
            }
        }
    });
}

exports.getAllUserFolders = async (user_id) => {
const folders = await prisma.nft_folders.findMany({
    where: {
        user_id: +user_id
    }
});
const modified_folders = folders.map(folder => {
  const {tokens, ...rest} = folder;
    const modified_tokens = Promise.all(tokens.map(async (token) => {
        const {contract_address, token_id} = token;
        const data = await alchemy.nft.getNftMetadata(contract_address, token_id);

    }))
})
}

exports.getFolderById = (folder_id) => {
    return prisma.nft_folders.findUnique({
        where: {
            id: folder_id
        }
    });
}

exports.getAllUserNft = async (wallet_address, contractAddresses = [], pageKey = '', pageSize = 1) => {
    return await alchemy.nft.getNftsForOwner(wallet_address, {pageSize, pageKey, contractAddresses});
}
exports.getNftData = async (token_id, contract_address) => {
    return await alchemy.nft.getNftMetadata(contract_address, token_id);
}

exports.getAllUserNfts = async (user_wallet, options = {}) => {
    return alchemy.nft.getNftsForOwner(user_wallet, options)
}


