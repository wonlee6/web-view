import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })
import './globals.css'

export const metadata: Metadata = {
  title: 'WebView App',
  description: 'Next.js app for WebView'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        <div className='relative flex min-h-screen flex-col'>{children}</div>
      </body>
    </html>
  )
}
