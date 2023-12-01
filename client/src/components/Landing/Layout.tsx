import React from "react";
import {Header} from "@components/Landing/Header/Header";
import {Footer} from "@components/Landing/Footer/Footer";
import styles from './layout.module.scss'
type Props = {
children: React.ReactNode
};

export function Layout(props: Props) {
    return <div className={styles.layout}>
        <main className={styles.layout__container}>
        <Header />
            <div className={styles.layout__content}>
        {props.children}
            </div>
        <Footer />
        </main>
    </div>
};