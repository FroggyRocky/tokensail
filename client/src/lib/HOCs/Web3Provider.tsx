// High order component (HOC) //
'use client';
import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {connectorsForWallets, darkTheme, getDefaultWallets, RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import {argentWallet, ledgerWallet, trustWallet,} from '@rainbow-me/rainbowkit/wallets';
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {arbitrum, base, goerli, mainnet, optimism, polygon, zora,} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';



const {chains, publicClient, webSocketPublicClient} = configureChains(
    [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        zora,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ],
    [publicProvider()]
);

const projectId = 'a128ad3264d373224bf75ed3eac1b840';

const {wallets} = getDefaultWallets({
    appName: 'TokenSail',
    projectId,
    chains,
});

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({projectId, chains}),
            trustWallet({projectId, chains}),
            ledgerWallet({projectId, chains}),
        ],
    },
]);


const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

type Props = {
   children: React.ReactNode;
};

export function Web3Provider(props: Props) {
    return <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme({
            accentColor: '#FF7A18',
            borderRadius: 'large',
            accentColorForeground: '#1C2851',
            overlayBlur: 'large',

        })}>
        {props.children}
        </RainbowKitProvider>
    </WagmiConfig>
};