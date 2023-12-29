'use client';
import Account from '@modules/Account/Account'
import {Web3Provider} from "../../lib/HOCs/Web3Provider";
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '@api/apolloClient';
type Props = {

};

async function Acc(props: Props) {
    const client = createApolloClient();
    return <Web3Provider>
        <ApolloProvider client={client}>
        <Account />
        </ApolloProvider>
    </Web3Provider>
};

export default Acc