'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchWithToken, postWithToken } from '../../services/api'
import { tokenService } from '../../services/tokenService'
import Footer from '../components/Footer'
import FAQ from './../components/FAQ'
import ProfileCompletion from './../components/ProfileCompletion'
import ProfileHeader from './../components/ProfileHeader'
import Subscription from './../components/Subscription'
import { useLanguage } from './../contexts/LanguageContext'
import languages from './../data/languages'


export default function ProfilePage() {


  const [isLoading, setIsLoading] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false)
  const [subscriptionDaysLeft, setSubscriptionDaysLeft] = useState(0)
  const { language } = useLanguage()
  const t = languages[language].profile
  const ft = languages[language].footer

  const router = useRouter()
  if (!tokenService.getAccessToken()) {
    router.push('/auth');
  }
  const updateProfile = async () => {

    setIsLoading(true)
    try {

      const dataToSend = { ...profile }

      const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('/')
        return `${year}-${month}-${day}`
      }

      dataToSend.car_registration_date = formatDate(dataToSend.car_registration_date)
      dataToSend.birth_date = formatDate(dataToSend.birth_date)

      delete dataToSend.phone_number
      const response = await postWithToken('/auth/profile/', dataToSend)
      console.log(response)
        
      if (response.message === 'User updated') {
        setIsProfileComplete(true)
        console.log(isProfileComplete);
        
        fetchData()
      }
    } catch (error) {
      console.error('Ошибка:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',

    birth_date: '',
    iin: '',
    city: '',
    car_registration_date: '',
    car_brand: '',
    car_model: '',
    car_plate_number: '',
    phone_number: '',
  })


  const fetchData = async () => {
    try {
      const profileResponse = await fetchWithToken('/auth/profile/')
      const profileData = profileResponse.user
      setProfile({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        birth_date: profileData.birth_date,
        iin: profileData.iin,
        city: profileData.city,
        car_registration_date: profileData.car_registration_date,
        car_brand: profileData.car_brand,
        car_model: profileData.car_model,
        car_plate_number: profileData.car_plate_number,
        phone_number: profileData.phone_number,
      })
      if (
        profileData.first_name &&
        profileData.last_name &&
        profileData.birth_date &&
        profileData.iin &&
        profileData.city &&
        profileData.car_registration_date &&
        profileData.car_brand &&
        profileData.car_model &&
        profileData.car_plate_number &&
        profileData.phone_number
      ) {
        setIsProfileComplete(true)
        console.log("Все поля заполнены");
      } else {
        // setIsProfileComplete(false)
        console.log("Не Все поля заполнены");
      }
      const subscriptionResponse = await fetchWithToken('/auth/subscription/')
      const subscription = subscriptionResponse.subscription
      if (subscription && subscription.active) {
        setHasActiveSubscription(true)
        const endDate = new Date(subscription.end_date)
        const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24))
        setSubscriptionDaysLeft(daysLeft)
      }
    } catch (error) {
      console.error('Error fetching profile or subscription data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [hasActiveSubscription])


  const buySubscription = async () => {
    try {
      // После успешной оплаты через TipTop Pay создаем подписку
      const response = await postWithToken('/auth/subscription/')
      if (response.active) {
        setHasActiveSubscription(true)
        fetchData()
        alert('Подписка успешно активирована!')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      alert('Ошибка при создании подписки. Обратитесь в поддержку.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6]">
      <ProfileHeader translations={t.navItems} />
      <main className="flex-1 p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#302E2F]">
            {t.greeting}
            {profile.first_name ? ` ${profile.first_name} ${profile.last_name}` : ` ${t.profileCompletion.placeholders.firstName}`}
          </h1>
          {hasActiveSubscription && (
            <p className="mb-4 text-green-600 text-sm md:text-base">
              {t.subscriptionActive.replace('{days}', subscriptionDaysLeft)}
            </p>
          )}
          <div className="flex flex-col gap-8">
            <ProfileCompletion
              isLoading={isLoading}
              updateProfile={updateProfile}
              hasActiveSubscription={hasActiveSubscription}
              profile={profile}
              setProfile={setProfile}
              translations={t.profileCompletion}
            />
            <Subscription
              isProfileComplete={isProfileComplete}
              hasActiveSubscription={hasActiveSubscription}
              onSubscribe={buySubscription}
              translations={t.subscription}
              expiryDate={subscriptionDaysLeft}
              userProfile={profile}
            />
            <FAQ translations={t.faq} />
          </div>
        </motion.div>
      </main>
      <Footer t={ft} />
    </div>
  )
}