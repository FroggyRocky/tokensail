// @flow
import * as React from 'react';

type Props = {
    name: string,
    placeholder: string,
    label: string,
    charLimit?: number,
    value:string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
};

export function CommonInput(props: Props) {
    return <div className={'flex flex-col'}>
        <label htmlFor={props.name} className={'block text-text text-sm font-bold mb-2'}>{props.label}</label>
    <input className={'border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
           id={props.name} name={props.name}
           placeholder={props.placeholder} value={props.value} onChange={props.handleChange}
    />
        {props.error && <p className={'text-red-500 text-xs mr-auto mt-3'}>{props.error}</p>}
        {props.charLimit && <p className={'text-link text-xs ml-auto mt-3'}>{props.value.length}/{props.charLimit}</p>}

    </div>
};
