'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { Globe } from 'lucide-react'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative inline-block text-left">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="block appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAD00] focus:border-[#FFAD00]"
      >
        <option value="ru">Русский</option>
        <option value="en">English</option>
        <option value="kz">Қазақша</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <Globe className="h-4 w-4" />
      </div>
    </div>
  )
}