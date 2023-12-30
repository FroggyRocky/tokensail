import { create } from 'zustand'
import {IAccountStore} from "@store/accountStore/accountTypes";
import {EnumAccountSteps} from "@store/accountStore/accountTypes";
import {produce} from "immer";
const useAccountStore = create<IAccountStore>()((set) => ({
    accountStep: EnumAccountSteps.account,
    accountData: undefined,
    allNftTokens: undefined,
    followingCryptos: [],
    currencyDateToCompare: currencyDateToCompare(),
    setAccountStep: (accountStep) => set({accountStep}),
    setAccountData: (accountData) => set({accountData}),
    setAllNftTokens: (allNftTokens) => set({allNftTokens}),
    setAccountNftFolders: (nftFolders) => set(produce((state) => {
        state.accountData.nft_folders = nftFolders
    })),
    setFollowingCryptos: (cryptos) => set(produce((state) => {
        state.followingCryptos = cryptos
    })),
}))



function currencyDateToCompare() {
    const currentDate = new Date();
    const year = +currentDate.getFullYear() - 1;
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export {useAccountStore}