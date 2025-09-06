'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, User} from 'lucide-react'
import { LanguageSelector } from './LanguageSelector'
import { useLanguage } from './../contexts/LanguageContext'
import languages from './../data/languages'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const t = languages[language]

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={'/'} className="flex items-center">
            <Image src="/logo.jpeg" alt="JOL911 Logo" width={100} height={40} />
          </Link>
          <nav className="hidden md:flex space-x-4">
            <LanguageSelector />
            <Link href={'/auth'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FFAD00] h-full flex gap-1 items-center text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                  <User className="block h-4 w-4" aria-hidden="true" />
                
              {t.profileBtn}
            </motion.button>
              </Link>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FFAD00]"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <LanguageSelector />
              <Link href={'/auth'}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-white bg-[#FFAD00] rounded-md"
                >
                  {/* <User className="block h-6 w-6" aria-hidden="true" /> */}
                {t.profileBtn}
              </motion.button>
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}