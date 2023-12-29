const prisma = require('../../db/prisma');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const nftModel = require('../model/nftModel');
const walletModel = require('../model/walletModel');
const {GraphQLError} = require('graphql');
const {errorNames} = require('../../errorTypes')
const ethers = require('ethers');
const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, context, p) => {
    //FOR DEV ONLY
    if(req.headers.origin === `http://localhost:${process.env.PORT}`) {
        const user = await userModel.getUserByWalletAddress('0xCdAA125746a670996c4D6d76D9BE35dd53E13ba9');
            req.isAuth = true;
            req.user = user;
            return req
    }
    //FOR DEV ONLY

    if (req.headers.authorization) {
        const [, token] = req.headers.authorization.split(' ');
        let wallet_address = undefined;
        try {
            wallet_address = validateVerifyToken(token)['data']['wallet_address']
        } catch (e) {
            console.log('authMiddleware error', e)
            req.user = undefined;
            req.isAuth = false;
            return req
        }
        if(!wallet_address) {
            req.user = undefined;
            req.isAuth = false;
            return req
        }
        const user = await userModel.getUserByWalletAddress(wallet_address);
        if (!user) {
            req.user = undefined;
        } else {
            req.user = user;
            req.isAuth = true;
        }
    }
    return req
}

exports.login = async (parent, args, context) => {
    const ctx = await context
    const {wallet_address, signature, message} = args;
    if (ctx.user) {
        return ctx.user;
    }
    if (!wallet_address || !signature || !message) {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    const isVerified = await verifySignature(wallet_address, signature, message)
    if (!isVerified) {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
    const user = await userModel.getUserByWalletAddress(wallet_address);
    try {
        if (!user) {
            const newUser = await userModel.createUser(wallet_address);
            const jwt_token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // one week
                data: {
                    wallet_address: wallet_address,
                    id: newUser.id
                }
            }, process.env.JWT_SECRET);
            return {
                token: jwt_token,
            };
        } else {
            const jwt_token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 1 day
                data: {
                    wallet_address: user.wallet_address,
                    id: user.id
                }
            }, process.env.JWT_SECRET);
            return {
                token: {
                    token: jwt_token,
                    expiresOn: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)).toISOString() //
                },
            };
        }
    } catch (e) {
        console.log(e)
        return new GraphQLError(errorNames.INVALID_DATA);
    }
}

exports.auth = async (parent, args, context) => {
    const {user} = await context
    let {folders_limit} = args;
    if(!folders_limit) {
        folders_limit = 2
    }
    if (user) {
        const args = {
            user: user,
            limit: 6,
            offset: 0,
        }
        const nft_folders = await nftModel.getAllUserFolders(user.id, folders_limit, 0);
        const wallet_activity = await walletModel.getWalletHistory(args);
        return {
            user: user,
            nft_folders: nft_folders,
            wallet_activity: wallet_activity
        }
    } else {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
}


async function verifySignature(walletAddress, signature, _sigMessage) {
    let verifiedAuthorization = ethers.verifyMessage(_sigMessage, signature)
    verifiedAuthorization = verifiedAuthorization.toLowerCase()
    if (walletAddress.toLowerCase() !== verifiedAuthorization) {
        return false
    } else if (walletAddress.toLowerCase() === verifiedAuthorization) {
        return true
    }
    return verifiedAuthorization
}

function validateVerifyToken(token) {
    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET)
        if (!isValid) {
            return new GraphQLError(errorNames.UNATHORIZED)
        }
        return jwt.decode(token)
    } catch (e) {
        return new GraphQLError(errorNames.UNATHORIZED)
    }
}