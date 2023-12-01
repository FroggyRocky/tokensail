const prisma = require('../../db/prisma');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const {GraphQLError} = require('graphql');
const {errorNames} = require('../../errorTypes')

exports.authMiddleware = async (req, context) => {
    if (req.session.user) {
        const user = await userModel.getUserById(req.session.user.id);
        if (!user) {
            req.user = undefined;
        } else {
            req.user = user;
        }
    } else if (req.headers.authorization) {
        const user = await userModel.getUserByWalletAddress(req.headers.authorization);
        if (!user) {
            req.user = undefined;
        } else {
            req.user = user;
        }
    }
    return req
}

exports.auth = async (req, context, res) => {
    const ctx = await context
    const {authInput} = req;
    const {wallet_address} = authInput;
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
            ctx.session.id = newUser.id;
            return newUser;
        } else {
            ctx.session.user = user.id;
            return user;
        }
    } catch (e) {
        console.log(e)
        throw new GraphQLError(errorNames.INVALID_DATA);
    }
}

exports.logout = async (req, context) => {
    req.session.destroy();
    return true;
}