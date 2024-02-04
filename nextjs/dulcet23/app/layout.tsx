import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-gray-50 h-full">
      <body className={`bg-gray-50 h-full`}>{children}</body>
    </html>
  )
}