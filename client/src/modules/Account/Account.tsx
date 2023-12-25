'use client';
import {WithAuth} from "../../lib/HOCs/WithAuth";
import {Home} from "@components/Account/Home/Home";
import {AccountLayout} from "@components/Account/AccountLayout";


type Props = {

};
 function AccountModule(props: Props) {
    return <AccountLayout>
        <Home />
    </AccountLayout>
};



const Account = WithAuth(AccountModule)
export default Account