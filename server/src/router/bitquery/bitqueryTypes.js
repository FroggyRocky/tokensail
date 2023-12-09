const {GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} = require("graphql");



const AddressType = new GraphQLObjectType({
    name: "Address",
    fields: () => ({
        address: { type: GraphQLString },
        annotation: { type: GraphQLString },
    }),
});

const CurrencyType = new GraphQLObjectType({
    name: "Currency",
    fields: () => ({
        address: { type: GraphQLString },
        symbol: { type: GraphQLString },
    }),
});

const DateType = new GraphQLObjectType({
    name: "Date",
    fields: () => ({
        date: { type: GraphQLString },
    }),
});



const UserActivityType = new GraphQLObjectType({
    name: "Action",
    fields: () => ({
        address: { type: AddressType },
        currency: { type: CurrencyType },
        amount: { type: GraphQLInt },
        date: { type: DateType },
    }),
});

const UserNftType = new GraphQLObjectType({
    name: "UserNft",
    fields: () => ({
        token_id: { type: GraphQLString },
        token_uri: { type: GraphQLString },
        folder_id: { type: GraphQLString },
    }),
});

exports.RecentWalletActionType = new GraphQLObjectType({
    name: 'RecentWalletAction',
    fields: () => ({
        ethereum: {
            type: new GraphQLObjectType({
                name: 'Ethereum',
                fields: () => ({
                    inflow: { type: GraphQLList(UserActivityType) },
                    outflow: { type: GraphQLList(UserActivityType) },
                })
            })
        },
    })
})


exports.UserNftType = new GraphQLObjectType({
    name: 'UserNftFolder',
    fields: () => ({
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        attributes: { type: GraphQLList(UserNftType) },
    })
})
