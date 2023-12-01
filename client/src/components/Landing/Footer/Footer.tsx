// @flow
import * as React from 'react';

type Props = {

};

export function Footer(props: Props) {
    return <div className={'px-5 pb-5 pt-12'}>
        <main className={'flex justify-between items-center'}>
            <p>TokenSail. All rights reserved</p>
            <aside>
                <span className={'mr-3'}>Contact:</span>
            <a className={'text-link hover:opacity-50'} href="mailto:froggybmt@gmail.com">froggybmt@gmail.com</a>
            </aside>
        </main>
    </div>
}