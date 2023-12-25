const {GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLBoolean} = require("graphql");


const OpenSeaMetadataType = new GraphQLObjectType({
    name: "OpenSeaMetadata",
    fields: () => ({
        floorPrice: { type: GraphQLFloat },
        collectionName: { type: GraphQLString },
        collectionSlug: { type: GraphQLString },
        safelistRequestStatus: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        description: { type: GraphQLString },
        externalUrl: { type: GraphQLString },
        twitterUsername: { type: GraphQLString },
        discordUrl: { type: GraphQLString },
        bannerImageUrl: { type: GraphQLString },
        lastIngestedAt: { type: GraphQLString },
    }),
});

const ContractType = new GraphQLObjectType({
    name: "Contract",
    fields: () => ({
        address: { type: GraphQLString },
        name: { type: GraphQLString },
        symbol: { type: GraphQLString },
        totalSupply: { type: GraphQLString },
        tokenType: { type: GraphQLString },
        contractDeployer: { type: GraphQLString },
        deployedBlockNumber: { type: GraphQLInt },
        openSeaMetadata: { type: OpenSeaMetadataType },
        isSpam: { type: GraphQLBoolean }, // Change to appropriate type if needed
        spamClassifications: { type: new GraphQLList(GraphQLString) },
    }),
});

const MintType = new GraphQLObjectType({
    name: "Mint",
    fields: () => ({
        mintAddress: { type: GraphQLString },
        blockNumber: { type: GraphQLInt },
        timestamp: { type: GraphQLString },
        transactionHash: { type: GraphQLString },
    }),
});
const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: () => ({
        cachedUrl: { type: GraphQLString },
        thumbnailUrl: { type: GraphQLString },
        pngUrl: { type: GraphQLString },
        contentType: { type: GraphQLString },
        size: { type: GraphQLInt },
        originalUrl: { type: GraphQLString },
    }),
})

const RawType = new GraphQLObjectType({
    name: "Raw",
    fields: () => ({
        tokenUri: { type: GraphQLString },
        metadata: {
            type: new GraphQLObjectType({
                name: "Metadata",
                fields: () => ({
                    name: { type: GraphQLString },
                    description: { type: GraphQLString },
                    image: { type: GraphQLString },
                    animationUrl: { type: GraphQLString },
                    attributes: { type: new GraphQLList(GraphQLString) },
                }),
            }),
        },
        error: { type: GraphQLString }, // Change to appropriate type if needed
    }),
})

const CollectionType = new GraphQLObjectType({
name: "Collection",
fields: () => ({
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    externalUrl: { type: GraphQLString },
    bannerImageUrl: { type: GraphQLString },
})
})

const AcquiredAtType = new GraphQLObjectType({
    name: "AcquiredAt",
    fields: () => ({
        blockTimestamp: { type: GraphQLString },
        blockNumber: { type: GraphQLString },
    }),
})

const TokenType = new GraphQLObjectType({
    name: "Token",
    fields: () => ({
        tokenId: { type: GraphQLString },
        tokenType: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        tokenUri: { type: GraphQLString },
        contract: { type: ContractType },
        image: { type: ImageType },
        raw: { type: RawType },
        collection: { type: CollectionType },
        mint: { type: MintType },
        owners: { type: new GraphQLList(GraphQLString) },
        timeLastUpdated: { type: GraphQLString },
        balance: { type: GraphQLString },
        acquiredAt: { type: AcquiredAtType },
    }),
});

module.exports = {
    TokenType
};