export interface IUserStore {
    userData: IUserData | undefined;
    wallet_address: walletAddressType | undefined;
    nftData: any;
    wallet_data: any;
    setUserData: (userData: IUserData) => void;
    setWalletAddress: (wallet_address: walletAddressType) => void;
    setNftData: (nftData: any) => void;
    setWalletData: (wallet_data: any) => void;
}

export interface IUserData {
    id: string;
    username: string | undefined;
    email: string | undefined;
}


export type walletAddressType = `0x${string}`