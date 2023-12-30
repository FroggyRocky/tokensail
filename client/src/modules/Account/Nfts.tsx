import {Nfts} from '@components/Account/Nfts/Nfts'
import {Wallet} from '@components/Account/Wallet/Wallet'
import {WithAuth} from "@lib/HOCs/WithAuth";
type Props = {

};

function NftModule(props: Props) {
    return <Nfts />
};



const NftsWithAuth = WithAuth(NftModule)
export default NftsWithAuth