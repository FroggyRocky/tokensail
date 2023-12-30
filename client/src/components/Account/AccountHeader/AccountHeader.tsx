import { RxAvatar } from "react-icons/rx";
import { RiArrowDownSLine } from "react-icons/ri";
import Link from 'next/link';
import {Logo} from '@UIKit/Logo/Logo';
import {useAccount} from 'wagmi'
import {useState} from "react";

type Props = {

};

export function AccountHeader(props: Props) {
    const {} = useAccount();
    return <div className={'bg-blend-overlay bg-gray-700 bg-opacity-50 relative z-1'}>
        <main className={'px-2 flex items-center justify-between relative z-5'}>
        <Logo />
            <aside className={'flex items-center max-w-lg flex-grow  justify-between'}>
                <Link href={'/account/wallet'} className={'hover:text-zinc-300'}>Wallet</Link>
                <Link href={'/account/nft'}  className={'hover:text-zinc-300'}>Nft</Link>
                <Link href={'/account/gallery'} className={'hover:text-zinc-300'}>Gallery</Link>
            </aside>
        <Link href={'/account'} className={'flex items-center cursor-pointer hover:opacity-60'} >
            <RxAvatar size={25} />
        </Link>
        </main>
    </div>
};