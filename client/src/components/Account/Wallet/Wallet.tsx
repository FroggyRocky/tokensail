import {useAccountStore} from "@store/accountStore/accountStore";

type Props = {

};

export function Wallet(props: Props) {
    const accountData = useAccountStore(state => state.accountData);

    return <div>
<h1>Wallet</h1>
    </div>
};