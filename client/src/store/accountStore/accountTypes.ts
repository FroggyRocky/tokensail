export enum EnumAccountSteps {
    account,
    nfts,
    nft_folders,
    wallet,
}

export interface IAccountStore {
    accountStep: EnumAccountSteps
    setAccountStep: (accountStep: EnumAccountSteps) => void
}