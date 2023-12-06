import {useUserStore} from "@store/userStore/userStore";

export function Home() {
    return <div className={''}>
        <main className={'relative z-5 grid-cols-3'}>
            <section>
                <h2>Recent Movements</h2>
            </section>
            <section>
                <h2>Recent gallery</h2>
            </section>
            <section>
                <h2>Recent gallery</h2>
            </section>
            <section>
                <h2>Following</h2>
            </section>
            <section>
                <h2>Following</h2>
            </section>
            <section>
                <h2>Following</h2>
            </section>
        </main>
    </div>
};