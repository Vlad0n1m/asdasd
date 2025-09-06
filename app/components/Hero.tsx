'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
export default function Hero({ t }:any) {
  return (
    <section className="bg-[#FFAD00] text-white py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-xl mb-8">{t.subtitle}</p>
        <Link href={'auth'}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#FFAD00] px-6 py-3 rounded-md text-lg font-medium"
          >
          {t.cta}
        </motion.button>
            </Link>
      </motion.div>
    </section>
  )
}