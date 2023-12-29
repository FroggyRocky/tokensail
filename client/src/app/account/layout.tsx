'use client'
import {ApolloProvider} from '@apollo/client';
import createApolloClient from '@api/apolloClient';
import {Web3Provider} from "@lib/HOCs/Web3Provider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const client = createApolloClient();
    return <Web3Provider>
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    </Web3Provider>
}
