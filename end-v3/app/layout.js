'use client'

import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
