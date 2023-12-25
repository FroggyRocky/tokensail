import {create, StateCreator} from 'zustand'
import {IAuthStore, walletAddressType} from "@store/authStore/authTypes";
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware'

type MyPersist = (
    config: StateCreator<IAuthStore>,
    options: PersistOptions<IAuthStore>
) => StateCreator<IAuthStore>
const useAuthStore = create<IAuthStore>(
    (persist as MyPersist)(
        (set, get) => ({
            auth_token: {
                token: '',
                expiresOn: ''
            },
            wallet_address: undefined,
            setWalletAddress: (wallet_address: walletAddressType) => set((state) => ({wallet_address})),
            setAuthToken: (payload:{token: string, expiresOn: string}) => set((state) => ({auth_token: payload})),
        }),
        {
            name: 'auth_storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage),
        },
    ),
)


export {useAuthStore}