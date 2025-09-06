'use client'

import Header from '../components/Header'
import React from 'react'
import { motion } from 'framer-motion'
import AuthForm from '../components/AuthForm'

import { useLanguage } from './../contexts/LanguageContext'
import languages from './../data/languages'
import { tokenService } from '../../services/tokenService'
import { useRouter } from 'next/navigation'


export default function AuthPage() {
    const { language } = useLanguage()
    const t = languages[language]
    const router = useRouter()

    if (tokenService.getAccessToken()) {
        router.push('/profile');
    }
    
    return (
        <div className="min-h-screen bg-[#F6F6F6] text-[#302E2F]">
            <Header />
            <main>
                <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >

                        <div className="sm:mx-auto my-auto sm:w-full sm:max-w-md">
                            <AuthForm t={t.AuthForm} />
                        </div>
                    </motion.div>
                </div>
            </main>

        </div>


    )
}