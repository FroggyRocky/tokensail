const {GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} = require("graphql");


const AddressType = new GraphQLObjectType({
    name: "Address",
    fields: () => ({
        address: {type: GraphQLString},
        annotation: {type: GraphQLString},
    }),
});

const CurrencyType = new GraphQLObjectType({
    name: "Currency",
    fields: () => ({
        address: {type: GraphQLString},
        symbol: {type: GraphQLString},
    }),
});

const DateType = new GraphQLObjectType({
    name: "Date",
    fields: () => ({
        date: {type: GraphQLString},
    }),
});


const UserWalletActivityType = new GraphQLObjectType({
    name: "UserWalletActivityType",
    fields: () => ({
        address: {type: AddressType},
        currency: {type: CurrencyType},
        amount: {type: GraphQLInt},
        date: {type: DateType},
    }),
});

const UserWalletHistoryType = new GraphQLObjectType({
    name: "UserWalletHistoryType",
    fields: () => ({
        address: {type: AddressType},
        currency: {type: CurrencyType},
        amount: {type: GraphQLFloat},
        date: {type: DateType},
        type: {type: GraphQLString},
        count: {type: GraphQLInt},
    }),
});

const WalletInflowsOutflowsType = new GraphQLObjectType({
    name: 'WalletInflowsOutflowsType',
    fields: () => ({
        inflow: {type: new GraphQLList(UserWalletActivityType)},
        outflow: {type: new GraphQLList(UserWalletActivityType)},
        inflowCount: {type: GraphQLInt},
        outflowCount: {type: GraphQLInt},
    })
})


// const UserNftType = new GraphQLObjectType({
//     name: 'UserNftFolder',
//     fields: () => ({
//         name: { type: GraphQLString },
//         description: { type: GraphQLString },
//         image: { type: GraphQLString },
//         attributes: { type: GraphQLList(UserNftType) },
//     })
// })


module.exports = {
    WalletInflowsOutflowsType,
    UserWalletActivityType,
    UserWalletHistoryType
}