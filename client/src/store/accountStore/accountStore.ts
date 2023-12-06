import { create } from 'zustand'
import {IAccountStore} from "@store/accountStore/accountTypes";
import {walletAddressType} from "@store/userStore/userTypes";
import {EnumAccountSteps} from "@store/accountStore/accountTypes";

const useAccountStore = create<IAccountStore>()((set) => ({
    accountStep: EnumAccountSteps.account,
    setAccountStep: (accountStep) => set({accountStep}),
}))


export {useAccountStore}