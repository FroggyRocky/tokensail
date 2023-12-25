import type {Config} from 'tailwindcss'
/** @type {import('tailwindcss').Config} */
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/UIKit/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                cd: 'var(--font-color-primary)',
                text2: 'var(--font-color-secondary)',
                link:'var(--color-link)',
                button:'var(--color-button)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
            }
        },

    },
    variants: {},
    plugins: [],
}
export default config
