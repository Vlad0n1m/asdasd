'use client'

import { useLanguage } from './contexts/LanguageContext'
import languages from './data/languages'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Footer from './components/Footer'
import SEOContent from './components/SEOContent'
import Head from 'next/head'

export default function Home() {
  const { language } = useLanguage()
  const t = languages[language]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JOL911",
    "description": "Круглосуточная помощь на дороге в Астане и Казахстане. Трезвый водитель, эвакуатор, зарядка аккумулятора, техпомощь.",
    "url": "https://jol911.com",
    "telephone": "+77009119911",
    "email": "info@jol911.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Кошкарбаева 40",
      "addressLocality": "Астана",
      "addressCountry": "KZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.1694",
      "longitude": "71.4491"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "4950 KZT",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "51.1694",
        "longitude": "71.4491"
      },
      "geoRadius": "100000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги помощи на дороге",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Трезвый водитель",
            "description": "Водитель приедет на помощь в любой ситуации"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Эвакуатор",
            "description": "Заберем вас из любого места и доставим в наш сервис"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Подзарядка аккумулятора",
            "description": "Мастер приедет и зарядит аккумулятор"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "sameAs": [
      "https://instagram.com/jol911",
      "https://facebook.com/jol911"
    ]
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://jol911.com"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      <div className="min-h-screen bg-[#F6F6F6] text-[#302E2F]">
        <Header />
        <main role="main">
          <Hero t={t.hero} />
          <Services t={t.services} />
          <SEOContent />
        </main>
        <Footer t={t.footer} />
      </div>
    </>
  )
}