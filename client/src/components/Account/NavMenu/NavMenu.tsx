import Link from 'next/link';
import { LuWallet } from "react-icons/lu";
import { RiNftFill } from "react-icons/ri";
type Props = {

};

export function NavMenu(props: Props) {
    return <div className={'border  rounded max-w-min'} >
        <main className={'p-5'}>
    <Link href={'/account/wallet'} className={'flex items-center text-white hover:text-white'}>
        <LuWallet />
        <span>Wallet</span>
    </Link>
        <Link href={'/account/nft'}>
            <RiNftFill />
            <span>NFT</span>
        </Link>
        </main>
    </div>
};