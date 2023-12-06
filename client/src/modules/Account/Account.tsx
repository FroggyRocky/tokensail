'use client';
import {useUserStore} from "@store/userStore/userStore";
import {WithAuth} from "../../lib/HOCs/WithAuth";
import {Home} from "@components/Account/Home/Home";
import {AccountLayout} from "@components/Account/AccountLayout";
import {Web3Provider} from "../../lib/HOCs/Web3Provider";

type Props = {

};
 function AccountModule(props: Props) {
     const {userData:user,} = useUserStore(state => state)
    return <AccountLayout>
        <Home />
    </AccountLayout>
};




export default AccountModule