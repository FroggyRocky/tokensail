import type {Config} from 'tailwindcss'
/** @type {import('tailwindcss').Config} */
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            text: 'var(--font-color-primary)',
            text2: 'var(--font-color-secondary)',
            link:'var(--color-link)',
            button:'var(--color-button)',
            primary: 'var(--color-primary)',
            secondary: 'var(--color-secondary)',

        }
    },
    plugins: [],
}
export default config
