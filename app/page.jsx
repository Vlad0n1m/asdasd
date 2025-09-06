'use client'

import { useLanguage } from './contexts/LanguageContext'
import languages from './data/languages'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Footer from './components/Footer'

export default function Home() {
  const { language } = useLanguage()
  const t = languages[language]

  return (
    
    <div className="min-h-screen bg-[#F6F6F6] text-[#302E2F]">
      <Header />
      <main>
        <Hero t={t.hero} />
        <Services t={t.services} />
      </main>
      <Footer t={t.footer} />
    </div>
  )
}