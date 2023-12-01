import './globals.css'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  style:['normal'],
  preload: true,
  fallback: ['Roboto', 'sans-serif'],
  weight: ['400', '700'],
  variable: '--font-primary',
})


export const metadata: Metadata = {
  title: 'TokenSail',
  description: 'TokenSail Wallet Gate Watcher',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>{children}</body>
    </html>
  )
}
