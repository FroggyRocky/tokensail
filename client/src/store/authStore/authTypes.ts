export interface IAuthStore {
    auth_token: TokenType;
    wallet_address: walletAddressType | undefined;
    setWalletAddress: (wallet_address: walletAddressType) => void;
    setAuthToken: (payload:TokenType) => void;
}

export type TokenType = {
    token: string;
    expiresOn: string;
}


export type walletAddressType = `0x${string}`