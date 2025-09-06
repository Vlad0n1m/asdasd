import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from './../contexts/LanguageContext'
import { Menu, X } from 'lucide-react'
import { tokenService } from '../../services/tokenService'
import { useRouter } from 'next/navigation'


const ProfileHeader = ({ activeTab, setActiveTab, translations }) => {
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const logout = () => {
    tokenService.clearTokens()
    router.push('/auth')
  }
  const navItems = [

  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setIsMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.jpeg" alt="JOL911 Logo" width={100} height={40} />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleTabClick(item.key)}
                className={`text-sm font-medium ${activeTab === item.key ? 'text-[#FFAD00]' : 'text-gray-700 hover:text-[#FFAD00]'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-[#FFAD00] focus:border-[#FFAD00] block p-2.5"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="kz">KZ</option>
            </select>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-[#FFAD00] z-50 relative">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {/* <button onClick={() => logout()} className='bg-orange-400 rounded text-white'>LOGOUT</button> */}

          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#FFAD00] z-40 flex items-center justify-center">
          <nav className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleTabClick(item.key)}
                className={`text-2xl font-medium ${activeTab === item.key ? 'text-white' : 'text-gray-800 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 text-xl rounded-lg focus:ring-white focus:border-white block p-2.5 w-40"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="kz">KZ</option>
            </select>
          </nav>
        </div>
      )}
    </header>
  )
}

export default ProfileHeader