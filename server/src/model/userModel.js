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
                email: email,
                username: username,
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

exports.changeUserData = (id, payload) => {
    const {wallet_address, ...data} = payload
    return prisma.users.update({
        where: {
            id: id
        },
        data: data
    });
}

exports.followCrypto = async (id, args) => {
    const {crypto} = args
    const user = await prisma.users.findUnique({
        where: {
            id: id

        }
    })
    const followed = user['following_cryptos']
    if(followed.includes(crypto)) {
        return user
    }
    return prisma.users.update({
        where: {
            id: id
        },
        data: {
            following_cryptos: {
                push: crypto
            }
        }
    });
}

exports.unfollowCrypto = async (id, args) => {
    const {crypto} = args
    const user = await prisma.users.findUnique({
        where: {
            id: id

        }
    })
    const followed = user['following_cryptos']
    if(!followed) {
        return user
    }
    const filtered = followed.filter(c => c !== crypto)
    return prisma.users.update({
        where: {
            id: id
        },
        data: {
            following_cryptos: {
                set: filtered
            }
        }
    });
}


