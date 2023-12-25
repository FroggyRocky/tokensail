import {walletAddressType} from "@store/authStore/authTypes";

export enum EnumAccountSteps {
    account,
    nfts,
    nft_folders,
    wallet,
}

export interface IAccountStore {
    accountStep: EnumAccountSteps | undefined
    accountData: AccountDataType | undefined
    setAccountData: (accountData: AccountDataType) => void
    setAccountStep: (accountStep: EnumAccountSteps) => void
}


export type AccountDataType  = {
    user:UserDataType | undefined,
    nft_folders: NftFoldersType[] | undefined,
    wallet_activity: WalletActivityType | undefined,
}

type UserDataType = {
    id: string;
    username: string | undefined;
    email: string | undefined;
    wallet_address: walletAddressType | undefined;
    isActive: boolean | undefined;
}

export type NftFoldersType = {
    id: string;
    name: string;
    tokens: walletAddressType[] | undefined,
    user_id: number | undefined
}



export type WalletActivityType = Array<WalletTransactionType & {type:'inflow' | 'outflow'}>

type WalletTransactionType = {
    address: {
        address: string;
        annotation: string;
    },
    currency: {
        address: string;
        symbol: string;
    },
    amount: number,
    date: {
        date: string;
    },
}


// Define types for Token
export type NftTokenPreviewType = Pick<NftTokenType, 'raw' | 'name' | 'tokenId' | 'contract'>;
export interface NftTokenType {
    tokenId: string;
    tokenType: string;
    name: string;
    description: string;
    tokenUri: string;
    contract: Contract;
    image: Image;
    raw: Raw;
    collection: Collection;
    mint: Mint;
    owners: string[];
    timeLastUpdated: string;
    balance: string;
    acquiredAt: {
        blockTimestamp: string;
        blockNumber: string;
    };
}

export type PaginationType = {
    pageKey:string | null, //string looks like a token string
    totalCount:number
}

// Define types for Mint
export interface Mint {
    mintAddress: string;
    blockNumber: number;
    timestamp: string;
    transactionHash: string;
}

// Define types for Image
export interface Image {
    cachedUrl: string;
    thumbnailUrl: string;
    pngUrl: string;
    contentType: string;
    size: number;
    originalUrl: string;
}

// Define types for Raw
export interface Raw {
    tokenUri: string;
    metadata: {
        name: string;
        description: string;
        image: string;
        animationUrl: string;
        attributes: string[];
    };
    error: string;
}

// Define types for Collection
export interface Collection {
    name: string;
    slug: string;
    externalUrl: string;
    bannerImageUrl: string;
}
// Define types for OpenSeaMetadata
export interface OpenSeaMetadata {
    floorPrice: number;
    collectionName: string;
    collectionSlug: string;
    safelistRequestStatus: string;
    imageUrl: string;
    description: string;
    externalUrl: string;
    twitterUsername: string;
    discordUrl: string;
    bannerImageUrl: string;
    lastIngestedAt: string;
}

// Define types for Contract
export interface Contract {
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: OpenSeaMetadata;
    isSpam: boolean;
    spamClassifications: string[];
}
