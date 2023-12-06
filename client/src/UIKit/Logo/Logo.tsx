import Image from "next/image";
import logo from "@assets/landing/logo.png";
import Link from "next/link";

type Props = {

};

export function Logo(props: Props) {
    return  <Link href={'/'}>
        <Image src={logo} alt="logo" width={70} height={70} className={'rounded-full'}  />
    </Link>
    };