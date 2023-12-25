import { create } from 'zustand'
import {IAccountStore} from "@store/accountStore/accountTypes";
import {walletAddressType} from "@store/authStore/authTypes";
import {EnumAccountSteps} from "@store/accountStore/accountTypes";

const useAccountStore = create<IAccountStore>()((set) => ({
    accountStep: EnumAccountSteps.account,
    accountData: undefined,
    setAccountStep: (accountStep) => set({accountStep}),
    setAccountData: (accountData) => set({accountData}),
}))


export {useAccountStore}