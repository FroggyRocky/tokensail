import { create } from 'zustand'
import {IUserStore} from "@store/userStore/userTypes";
import {walletAddressType} from "@store/userStore/userTypes";

const useUserStore = create<IUserStore>()((set) => ({
    userData: undefined,
    wallet_address: undefined,
    nftData: undefined,
    wallet_data: undefined,
    setUserData: (userData) => set({userData}),
    setWalletAddress: (wallet_address:walletAddressType) => set({wallet_address}),
    setNftData: (nftData) => set({nftData}),
    setWalletData: (wallet_data) => set({wallet_data})
}))


export {useUserStore}