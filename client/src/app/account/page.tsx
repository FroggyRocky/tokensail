'use client';
import Account from '@modules/Account/Account'
import {Web3Provider} from "../../lib/HOCs/Web3Provider";
import {WithAuth} from "../../lib/HOCs/WithAuth";

type Props = {

};

async function Acc(props: Props) {
    return <Web3Provider>
        <Account />
    </Web3Provider>
};

const AuthAcc = WithAuth(Acc)
export default Acc