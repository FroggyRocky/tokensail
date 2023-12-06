'use client';
import {useAccountStore} from "@store/accountStore/accountStore";
import {useUserStore} from "@store/userStore/userStore";
import {IUserStore} from "@store/userStore/userTypes";
import {IAccountStore} from "@store/accountStore/accountTypes";

export function userStoreInitializer(storeValues:Partial<IUserStore>) {
useUserStore.setState(storeValues)
}

export function accountStoreInitializer(storeValues:Partial<IAccountStore>) {
useAccountStore.setState(storeValues)
}