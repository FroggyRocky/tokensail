const { Network, Alchemy } = require('alchemy-sdk');


const settings = {
    apiKey: process.env.ALCHEMY_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

module.exports = alchemy;