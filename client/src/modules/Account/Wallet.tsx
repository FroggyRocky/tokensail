import {WithAuth} from "@lib/HOCs/WithAuth";
import {Wallet} from '@components/Account/Wallet/Wallet'
type Props = {

};

function WalletModule(props: Props) {
    return <Wallet />
};



 const WalletWithAuth = WithAuth(WalletModule)
export default WalletWithAuth