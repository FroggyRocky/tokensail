import Image from 'next/image'
import logo from '@assets/landing/logo.png'
import {useConnectModal, useAccountModal, useChainModal, ConnectButton} from "@rainbow-me/rainbowkit";
import {Logo} from '@UIKit/Logo/Logo'

export function Header() {
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    return <div className={'p-4'}>
        <main className={'flex justify-between items-center'}>
            <Logo />
            <ConnectButton.Custom>
                {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                  }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <p onClick={openConnectModal} className={'text-lg font-semibold text-link hover:opacity-50 cursor-pointer tracking-wider'}>Connect Wallet</p>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <p onClick={openChainModal} className={'text-lg font-semibold text-link hover:opacity-50 cursor-pointer tracking-wider'}>
                                            Wrong network
                                        </p>
                                    );
                                }

                                return (
                                    <div className={'flex items-center gap-6'}>
                                        <button
                                            onClick={openChainModal}
                                            className={'text-lg font-semibold text-white hover:opacity-50 cursor-pointer tracking-wider flex items-center'}
                                            type="button"
                                        >
                                            {chain.hasIcon && (
                                                <div
                                                    style={{
                                                        background: chain.iconBackground,
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: 999,
                                                        overflow: 'hidden',
                                                        marginRight: 4,
                                                    }}
                                                >
                                                    {chain.iconUrl && (
                                                        <img
                                                            alt={chain.name ?? 'Chain icon'}
                                                            src={chain.iconUrl}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {chain.name}
                                        </button>

                                        <button onClick={openAccountModal} type="button" className={'text-link'}>
                                            {account.displayName}
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>

        </main>
    </div>
};



