const prisma = require('../../db/prisma');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const {GraphQLError} = require('graphql');
const {errorNames} = require('../../errorTypes')

exports.authMiddleware = async (req, context) => {
    // if (req.session.user) {
    //     const user = await userModel.getUserById(req.session.user);
    //     if (!user) {
    //         req.user = undefined;
    //     } else {
    //         req.user = user;
    //     }
    // } else
        if (req.headers.authorization) {
        const user = await userModel.getUserByWalletAddress(req.headers.authorization);
        if (!user) {
            req.user = undefined;
        } else {
            req.user = user;
        }
    }
    return req
}
exports.login = async (req, context) => {
    const ctx = await context
    const {loginInput} = req;
    const {wallet_address} = loginInput;
    if (ctx.user) {
        return ctx.user;
    }
    if (!wallet_address) {
        throw new GraphQLError(errorNames.UNATHORIZED);
    }
    const user = await userModel.getUserByWalletAddress(wallet_address);
    try {
        if (!user) {
            const newUser = await userModel.createUser(wallet_address);
            return newUser;
        } else {
            return user;
        }
    } catch (e) {
        console.log(e)
        throw new GraphQLError(errorNames.INVALID_DATA);
    }
}
exports.auth = async (req, context) => {
    const ctx = await context
    if (ctx.user) {
        return ctx.user;
    } else {
        throw new GraphQLError(errorNames.UNATHORIZED);
    }
}
exports.logout = async (req, context) => {
    req.session.destroy();
    return true;
}