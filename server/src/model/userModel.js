const {prisma} = require('../../db/prisma')

exports.getAllUsers =  () => {
    return prisma.users.findMany();
}


exports.getUserById =  (id) => {
    if(!id) throw new Error('id is required')
    return prisma.users.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}

exports.getUserByEmail = (email) => {
    if(!email) throw new Error('id is required')
    return prisma.users.findUnique({
        where: {
            email: email
        }
    })
}

exports.getUserByWalletAddress = (wallet_address) => {
    if(!wallet_address) throw new Error('wallet_address is required')
    return prisma.users.findUnique({
        where: {
            wallet_address: wallet_address
        }
    });
}

exports.createUser = (wallet_address, email = '', username='') => {
    if(!email || !username) {
        return prisma.users.create({
            data: {
                wallet_address: wallet_address,
                email: null,
                username: null,
                isActive: false,
            }
        });
    } else {
        return prisma.users.create({
            data: {
                wallet_address: wallet_address,
                email: email,
                username: username,
                isActive: true,
            }
        });
    }
}
