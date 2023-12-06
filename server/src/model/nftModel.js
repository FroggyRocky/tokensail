const {prisma} = require('../database/db');
const alchemy = require('../lib/alchemy');

exports.createNftFolder = (name, user_id, tokens= []) => {
    return prisma.nft_folders.create({
        data: {
            name: name,
            user_id: user_id,
            tokens: tokens,
        }
    });
}

exports.addTokenToFolder = (folder_id, token_id) => {
    return prisma.nft_folders.update({
        where: {
            id: folder_id
        },
        data: {
            tokens: {
                push: token_id
            }
        }
    });
}

exports.getAllUserFolders = (user_id) => {
    return prisma.nft_folders.findMany({
        where: {
            user_id: user_id
        }
    });
}

exports.getFolderById = (folder_id) => {
    return prisma.nft_folders.findUnique({
        where: {
            id: folder_id
        }
    });
}

exports.getAllUserNfts = async (user_wallet, options = {}) => {
    return alchemy.nft.getNftsForOwner(user_wallet, options)
}


