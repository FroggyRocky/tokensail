import {SupportedCurrenciesType} from "@store/accountStore/accountTypes";
import {FollowCurrencyAPI} from '@api/followCurrencyAPI'
import {useEffect} from "react";
import {useState} from "react";
import {BiLoaderAlt} from "react-icons/bi";
import { MdClose } from "react-icons/md";
import {getDifferenceInPercentage} from '@lib/helpers/currencyHelpers'
import styles from '@UIKit/Nfts/AddNftBox/addNftBox.module.scss'
type Props = {
    handleUnfollowCrypto: (currency:string | undefined) => void
    currency: SupportedCurrenciesType | undefined
};
type CurrencyDataType = {
    percentageChange: any
    currencyRate: any
}
export function FollowingCryptoBox(props: Props) {
    const [isLoading, setIsLoading] = useState(true)
    const [currencyData, setCurrencyData] = useState<CurrencyDataType>({percentageChange: 0, currencyRate: 0})
    const [intervalId, setIntervalId] = useState<any>(null)


    useEffect(() => {
        async function fetch() {
            const curr = props.currency as string
            const currencyRateRes = await FollowCurrencyAPI.getExchangeRate(curr)
            const historicRate = await FollowCurrencyAPI.getFollowCurrencyHistoricSpotPrice(curr)
            const percentageChange = getDifferenceInPercentage(parseFloat(currencyRateRes.data.data.amount),
                parseFloat(historicRate.data.data.amount))
            setCurrencyData((prev) => ({...prev, percentageChange, currencyRate: parseFloat(currencyRateRes.data.data.amount)}))
        }
        fetch().then(() => {
            setIsLoading(false)
            setIntervalId(setInterval(() => {
                fetch()
            }, 10000))
        })
        return () => {
            clearInterval(intervalId)
        }
    },[])
    return <div className={styles.addNftBox} style={{height:'100%'}}>
        {isLoading ? <div className={'flex items-center justify-center text-center h-full'}>
                <BiLoaderAlt size={70} className={'w-5/12 h-5/12 text-gray-200 animate-spin dark:text-gray-600 align-middle'}/>
        </div> :
            <div className={'p-8'}>
            <p className={'font-bold'}>Currency: {props.currency}</p>
            <p className={'font-bold'}>Price: {Math.trunc(currencyData.currencyRate)} USD</p>
            <p className={`font-bold`}>Percentage change:
                <span className={`${currencyData.percentageChange > 0 ? 'text-green-500' : 'text-red-600'}`}>{Math.trunc(currencyData.percentageChange)}%</span>
            </p>
                <MdClose onClick={() => props.handleUnfollowCrypto(props.currency)} className={'absolute top-1 right-2'} />
        </div>}

    </div>
};