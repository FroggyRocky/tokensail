const prisma = require('../../db/prisma');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const {GraphQLError} = require('graphql');
const {errorNames} = require('../../errorTypes')
const ethers = require('ethers');

const {verify, decode, sign} = require('jsonwebtoken')
exports.authMiddleware = async (req, context) => {
    if(req.headers.origin === `http://localhost:${process.env.PORT}`) {
            req.isAuth = true;
            req.user = undefined;
            return req
    }
    if (req.headers.authorization) {
        const [, token] = req.headers.authorization.split(' ');
        let wallet_address;
        try {
            wallet_address = validateVerifyToken(token)['wallet_address']
        } catch (e) {
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
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 1 day
                data: user.wallet_address
            }, process.env.JWT_SECRET);
            return {
                user: newUser,
                token: jwt_token,
            };
        } else {
            const jwt_token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 1 day
                data: user.wallet_address
            }, process.env.JWT_SECRET);
            return {
                user: user,
                token: jwt_token,

            };
        }
    } catch (e) {
        console.log(e)
        return new GraphQLError(errorNames.INVALID_DATA);
    }
}

exports.auth = async (req, context) => {
    const ctx = await context
    if (ctx.user) {
        return ctx.user;
    } else {
        return new GraphQLError(errorNames.UNATHORIZED);
    }
}

exports.logout = async (req, context) => {
    req.session.destroy();
    return true;
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
        const isValid = verify(token, process.env.JWT_SECRET)
        if (!isValid) {
            return new GraphQLError(errorNames.UNATHORIZED)
        }
        return decode(token)
    } catch (e) {
        return new GraphQLError(errorNames.UNATHORIZED)
    }
}