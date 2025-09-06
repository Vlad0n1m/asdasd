import { LanguageProvider } from './contexts/LanguageContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'JOL911 - Помощь на дороге в Астане | Трезвый водитель, Эвакуатор, Зарядка АКБ',
  description: 'Круглосуточная помощь на дороге в Астане и Казахстане. Трезвый водитель, эвакуатор, зарядка аккумулятора, техпомощь. Всего 4950 тенге в год! Звоните: 87009119911',
  keywords: 'помощь на дороге Астана, трезвый водитель, эвакуатор, зарядка аккумулятора, техпомощь авто, JOL911, автопомощь Казахстан, круглосуточно',
  authors: [{ name: 'JOL911' }],
  creator: 'JOL911',
  publisher: 'JOL911',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jol911.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ru-KZ': '/ru',
      'kk-KZ': '/kz',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'JOL911 - Помощь на дороге в Астане | Трезвый водитель, Эвакуатор',
    description: 'Круглосуточная помощь на дороге в Астане. Трезвый водитель, эвакуатор, зарядка АКБ. Всего 4950 тенге в год! ☎️ 87009119911',
    url: 'https://jol911.com',
    siteName: 'JOL911',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'JOL911 - Помощь на дороге',
      },
    ],
    locale: 'ru_KZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOL911 - Помощь на дороге в Астане',
    description: 'Круглосуточная помощь на дороге. Трезвый водитель, эвакуатор, зарядка АКБ. 4950₸/год',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}

export default function RootLayout({children}) {
  return (
    <html lang="ru-KZ">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFAD00" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Yandex Metrica */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
            ym(12345678, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `
        }} />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `
        }} />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
        
        {/* Yandex Metrica NoScript */}
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/12345678" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  )
}