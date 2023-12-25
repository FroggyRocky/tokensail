import {FaArrowAltCircleLeft, FaArrowAltCircleRight, FaBitcoin, FaEthereum} from "react-icons/fa";
import {TbBrandTether} from "react-icons/tb";
import {BiSolidCoin} from "react-icons/bi";
import {formatWithDotDate} from "@lib/helpers/dateHelpers";

type Props = {
    transaction: "inflow" | "outflow";
    amount: number;
    currency: string;
    date: Date | string;
};

export function TransactionPreview(props: Props) {
    function chooseIcon() {
        switch (props.currency) {
            case "ETH":
                return <FaEthereum size={22}/>;
            case "BTC":
                return <FaBitcoin size={22}/>;
            case "USDT":
                return <TbBrandTether size={22}/>;
            default:
                return <BiSolidCoin size={22}/>;
        }
    }

    function chooseTransactionIcon() {
        switch (props.transaction) {
            case "inflow":
                return <FaArrowAltCircleRight size={18} color={'#008000'}/>;
            case "outflow":
                return <FaArrowAltCircleLeft size={18} color={'#9D0000'}/>;
        }
    }

    return <div>
        <div className={"grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 justify-between items-center gap-0.5"}>
            <p>
            {chooseIcon()}
            </p>
            <p className={'mr-3'}>{parseFloat(props.amount.toFixed(2))}</p>
            <p className={'hidden sm:block'}>{props.currency}</p>
            <p className={'hidden md:block'}>{formatWithDotDate(props.date)}</p>
            <p className={"ml-auto"}>
            {chooseTransactionIcon()}
            </p>
        </div>
    </div>
};