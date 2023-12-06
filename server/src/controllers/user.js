const axios = require('axios')

exports.getUserRecentWalletActions = async (req, context) => {
    const ctx = await context
    console.log(ctx.user)
    const res = await axios.post('https://streaming.bitquery.io/graphql', {
        query: `
        ethereum(network: ethereum) {
    address(address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e") {
        balances {
            currency {
                symbol
            }
            value
        }
        transactions(options: {limit: 5}) {
            block {
                height
                timestamp {
                    time(format: "%Y-%m-%d %H:%M:%S")
                }
            }
            amount
            currency {
                symbol
            }
            sender {
                address
            }
            receiver {
                address
            }
        }
    }
}
        `
    })
    console.log(JSON.stringify(res.data))
}

exports.getUserNfts = async (req, context) => {
    const {user} = await context
    if (!user) {
        throw new GraphQLError(errorNames.UNATHORIZED);
    }
    return nftModel.getAllUserNfts(user.id);
}


//     ethereum(network: ethereum) {
//     address(address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e") {
//         balances {
//             currency {
//                 symbol
//             }
//             value
//         }
//         transactions(options: {limit: 5}) {
//             block {
//                 height
//                 timestamp {
//                     time(format: "%Y-%m-%d %H:%M:%S")
//                 }
//             }
//             amount
//             currency {
//                 symbol
//             }
//             sender {
//                 address
//             }
//             receiver {
//                 address
//             }
//         }
//     }
// }

