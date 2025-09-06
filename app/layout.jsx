import { LanguageProvider } from './contexts/LanguageContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'JOL911 - One-Time Car Insurance',
  description: 'Flexible and affordable one-time car insurance options',
}

export default function RootLayout({children}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}