import type { Metadata } from 'next'
import { LanguageProvider } from '@/lib/LanguageContext'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'SportDesk - Find Youth Sports Events',
  description: 'Find and book youth sports tournaments, training camps, and tryouts across Europe',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
