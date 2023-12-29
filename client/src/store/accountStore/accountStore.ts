import { create } from 'zustand'
import {IAccountStore} from "@store/accountStore/accountTypes";
import {EnumAccountSteps} from "@store/accountStore/accountTypes";
import {produce} from "immer";
const useAccountStore = create<IAccountStore>()((set) => ({
    accountStep: EnumAccountSteps.account,
    accountData: undefined,
    allNftTokens: undefined,
    setAccountStep: (accountStep) => set({accountStep}),
    setAccountData: (accountData) => set({accountData}),
    setAllNftTokens: (allNftTokens) => set({allNftTokens}),
    setAccountNftFolders: (nftFolders) => set(produce((state) => {
        state.accountData.nft_folders = nftFolders
    })),
}))


export {useAccountStore}