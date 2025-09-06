'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
export default function Hero({ t }:any) {
  return (
    <section className="bg-[#FFAD00] text-white py-20" itemScope itemType="https://schema.org/Service">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <header>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" itemProp="name">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed" itemProp="description">
            {t.subtitle}
          </p>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link href={'auth'} className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#FFAD00] px-8 py-4 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Получить предложение по услугам помощи на дороге"
            >
              {t.cta}
            </motion.button>
          </Link>
          
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="text-white">
              <span className="block text-sm opacity-90">Звоните прямо сейчас:</span>
              <a 
                href="tel:+77009119911" 
                className="text-xl font-bold hover:underline"
                itemProp="telephone"
              >
                8 700 911 99 11
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center">
            <span className="mr-2">⏰</span>
            <span>Круглосуточно 24/7</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">💰</span>
            <span>От 4950₸ в год</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🚗</span>
            <span>По всей Астане</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}