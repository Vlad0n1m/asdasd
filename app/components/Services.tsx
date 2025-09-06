'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import services from './../data/services'

export default function Services({ t }:any) {
  const { language } = useLanguage()

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          {t.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col h-full"
            >
              <service.icon className="w-12 h-12 mb-4 text-[#FFAD00]" />
              <h3 className="text-xl font-semibold mb-2">{service.label[language]}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.description[language]}</p>
              <Link href={'auth'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFAD00] text-white px-4 py-2 rounded-md text-sm font-medium w-full mt-auto"
                >
                {t.select}
              </motion.button>
                  </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}