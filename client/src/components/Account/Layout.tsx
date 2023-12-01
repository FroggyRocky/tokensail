import {Header} from "@components/Landing/Header/Header";
import {Footer} from "@components/Landing/Footer/Footer";

type Props = {
    children: React.ReactNode
};

export function Layout(props: Props) {
    return <div>
        <Header />
        <main className={'bg-secondary'}>
            {props.children}
        </main>
        <Footer />
    </div>
};