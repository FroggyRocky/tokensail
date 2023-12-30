import {useMutation} from "@apollo/client";
import {FOLLOW_CRYPTO} from '@api/mutations'
import {useAccountStore} from "@store/accountStore/accountStore";
import {SupportedCurrenciesType} from '@store/accountStore/accountTypes'
import {useState} from "react";
import {useAuthStore} from "@store/authStore/authStore";

type Props = {
    handleCloseForm: () => void
};

type CryptoMutationType = {
    following_cryptos: SupportedCurrenciesType[]
}

export function FollowCryptoForm(props: Props) {
    const setFollowingCryptos = useAccountStore(state => state.setFollowingCryptos)
    const token = useAuthStore(state => state.auth_token)
    const [crypto, setCrypto] = useState<string>()
    const [followCrypto, {
        data: followCryptoData,
        loading: followCryptoLoading,
        error: followCryptoError
    }] = useMutation(FOLLOW_CRYPTO, {
        context: {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        },
        onCompleted: async (data: { followCrypto: CryptoMutationType }) => {
            setFollowingCryptos(data.followCrypto.following_cryptos)
            props.handleCloseForm()
        }
    });

    async function handleOptionSelect(e: any) {
        setCrypto(e.target.value)
    }

    return <div>
        <h1 className={'mb-5'}>Follow crypto form</h1>
        <section className={'flex flex-col gap-5'}>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="radio"
                    value={'BTC'}
                    onChange={handleOptionSelect}
                    name={'currency'}
                    className="form-radio text-link h-5 w-5"
                />
                <span className="text-white">{'BTC'}</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="radio"
                    value={'ETH'}
                    name={'currency'}
                    onChange={handleOptionSelect}
                    className="form-radio text-link h-5 w-5"
                />
                <span className="text-white">{'ETH'}</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="radio"
                    value={'USDT'}
                    name={'currency'}
                    onChange={handleOptionSelect}
                    className="form-radio text-link h-5 w-5"
                />
                <span className="text-white">{'USDT'}</span>
            </label>
        </section>
        <button onClick={() => followCrypto({variables: {crypto}})}
                className={'bg-link text-white p-2 rounded-md mt-5'}>{followCryptoLoading ? 'Loading...' : "Follow"}
        </button>
    </div>
};