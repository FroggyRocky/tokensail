import axios from 'axios'
import {SupportedCurrenciesType} from "@store/accountStore/accountTypes";
import {useAccountStore} from "@store/accountStore/accountStore";

const FollowCurrencyAPI = {
    async getFollowCurrencyHistoricSpotPrice(currency: string | SupportedCurrenciesType) {
        const {currencyDateToCompare} = useAccountStore.getState()
        return await axios.get<currencyRateResponseType>(`https://api.coinbase.com/v2/prices/${currency}-USD/spot?date=${currencyDateToCompare}`)
    },
    async getExchangeRate(currency: string) {
        return await axios.get<currencyRateResponseType>(`https://api.coinbase.com/v2/prices/${currency}-USD/spot`)
    }
}

type currencyRateResponseType = {
    data: {
        amount: string,
        base: string,
        currency: string
    }
}

export { FollowCurrencyAPI }