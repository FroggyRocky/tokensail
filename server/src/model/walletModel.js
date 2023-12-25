const {prisma} = require('../../db/prisma')
const {addressWalletInflowsOutflows, addressNfts} = require('../router/bitquery/bitqueries');
const axios = require('axios');

exports.getWalletInflowsOutflows = async (args) => {
    try {
        const {limit, offset, user} = args;
        const res = await axios.post('https://graphql.bitquery.io', {
            query: addressWalletInflowsOutflows,
            variables: {
                "limit": limit || 6,
                "offset": offset || 0,
                "network": "ethereum",
                "address": user.wallet_address,
                "dateFormat": "%Y-%m-%d"
            }
        }, {
            headers: {
                "X-API-KEY": process.env.BITQUERY_API_KEY
            }
        })
        return res.data.data
    } catch (e) {
        console.log(e)
    }
}

exports.getWalletHistory = async (args) => {
    const {limit, offset, user} = args;
    const res = await axios.post('https://graphql.bitquery.io', {
        query: addressWalletInflowsOutflows,
        variables: {
            "limit":limit || 10,
            "offset":offset || 0,
            "network": "ethereum",
            "address": user.wallet_address,
            "dateFormat": "%Y-%m-%d"
        }
    }, {
        headers: {
            "X-API-KEY": process.env.BITQUERY_API_KEY
        }
    })
    const data  = res.data.data['ethereum']
    const inflows = data.inflow.map((inflow) => ({...inflow, type: 'inflow'}))
    const outflows = data.outflow.map((outflow) => ({...outflow, type: 'outflow'}))
    let newData = [...inflows, ...outflows]
    newData.sort((a, b) => {
        return new Date(b.date.date) - new Date(a.date.date)
    })
    return newData
}

