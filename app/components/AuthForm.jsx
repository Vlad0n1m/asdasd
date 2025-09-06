'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import InputMask from 'react-input-mask'

import { Login, Register } from './../../services/api'
import { useRouter } from 'next/navigation'



const AuthForm = ({ t }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const router = useRouter();  // Initialize the navigate function
  const [error, setError] = useState('')

 

  const cleanPhoneNumber = (phone) => {
    return phone.replace(/\D/g, '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);

    if (isLogin) {
      try {
        const response = await Login(cleanedPhoneNumber, loginPassword);
        console.log(response);
        // Check if login was successful (you might want to check specific fields in the response)
        if (response && response.access_token) {
          // Redirect to the profile page
          router.push('/profile');  // Adjust the path as needed
        } else {
          setError(t?.loginFailed || 'Login failed: Invalid credentials');
        }
      } catch (error) {
        setError(t?.loginFailed || 'Login failed: Invalid credentials');
      }
    } else {
      try {
        const response = await Register(name, surname, cleanedPhoneNumber, password, repeatPassword);
        console.log(response);

        // Check if login was successful (you might want to check specific fields in the response)
        if (response && response.access_token) {
          // Redirect to the profile page
          router.push('/profile');  // Adjust the path as needed
        } else {
          setError(t?.loginFailed || 'Login failed: Invalid credentials');
        }
      } catch (error) {
        setError(t?.loginFailed || 'Login failed: Invalid credentials');
      }
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+7 $$\d{3}$$ \d{3}-\d{2}-\d{2}$/
    return phoneRegex.test(phone)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? t?.loginTitle || 'Login' : t?.registerTitle || 'Register'}
      </h2>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                {t?.phoneNumber || 'Phone Number'}
              </label>
              <InputMask
                mask="+7 (999) 999-99-99"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder={t?.phonePlaceholder || "+7 (___) ___-__-__"}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                {t?.password || 'Password'}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder={t?.passwordPlaceholder || "Enter your password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                {t?.name || 'Name'}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder={t?.namePlaceholder || "Enter your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                {t?.surname || 'Surname'}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="surname"
                type="text"
                placeholder={t?.surnamePlaceholder || "Enter your surname"}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                {t?.phoneNumber || 'Phone Number'}
              </label>
              <InputMask
                mask="+7 (999) 999-99-99"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder={t?.phonePlaceholder || "+7 (___) ___-__-__"}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                {t?.password || 'Password'}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder={t?.passwordPlaceholder || "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeatPassword">
                {t?.repeatPassword || 'Repeat Password'}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="repeatPassword"
                type="password"
                placeholder={t?.repeatPasswordPlaceholder || "Repeat your password"}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <p className='text-red-500 font-bold my-2'>{error}</p>
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FFAD00] hover:bg-[#FFB824] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLogin ? (t?.loginButton || 'Login') : (t?.registerButton || 'Register')}
          </motion.button>
          <button
            className="inline-block align-baseline font-bold text-sm text-[#FFAD00] hover:text-[#FFB824]"
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? (t?.needAccount || 'Need an account?') : (t?.haveAccount || 'Already have an account?')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm