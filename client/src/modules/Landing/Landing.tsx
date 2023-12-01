'use client';
import {Layout} from "@components/Landing/Layout";
import {Web3Provider} from "../../lib/HOCs/Web3Provider";
import {Intro} from "@components/Landing/Intro/Intro";
export function Landing() {
    return <Web3Provider>
        <Layout>
            <Intro/>
        </Layout>
    </Web3Provider>
}