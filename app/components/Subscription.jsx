import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Subscription = ({ isProfileComplete, hasActiveSubscription, onSubscribe, translations, expiryDate, userProfile }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)
  
  // Загружаем TipTop Pay скрипт
  useEffect(() => {
    const loadScript = () => {
      // Проверяем, уже ли загружен глобальный объект
      if ((window.cp && typeof window.cp === 'object') || 
          (window.tiptop && typeof window.tiptop === 'object')) {
        setScriptLoaded(true)
        return
      }

      // Проверяем, не загружается ли уже скрипт
      if (document.getElementById('tiptop-pay-script')) {
        return
      }

      const script = document.createElement('script')
      script.id = 'tiptop-pay-script'
      script.src = 'https://widget.tiptoppay.kz/bundles/widget.js'
      script.async = true
      
      script.onload = () => {
        console.log('TipTop Pay script loaded successfully')
        // Ждем немного, чтобы убедиться что объект инициализирован
        setTimeout(() => {
          if ((window.cp && typeof window.cp === 'object') || 
              (window.tiptop && typeof window.tiptop === 'object')) {
            setScriptLoaded(true)
            setScriptError(false)
          } else {
            console.error('TipTop Pay object not found after script load')
            setScriptError(true)
          }
        }, 500)
      }
      
      script.onerror = (error) => {
        console.error('Failed to load TipTop Pay script:', error)
        setScriptError(true)
        setScriptLoaded(false)
      }
      
      document.head.appendChild(script)
    }

    loadScript()

    // Проверяем каждые 500мс в течение 10 секунд
    const checkInterval = setInterval(() => {
      if ((window.cp && typeof window.cp === 'object') || 
          (window.tiptop && typeof window.tiptop === 'object')) {
        setScriptLoaded(true)
        setScriptError(false)
        clearInterval(checkInterval)
      }
    }, 500)

    // Очищаем интервал через 10 секунд
    const timeout = setTimeout(() => {
      clearInterval(checkInterval)
      if (!scriptLoaded && !window.cp && !window.tiptop) {
        setScriptError(true)
      }
    }, 10000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeout)
    }
  }, [scriptLoaded])

  // Функция инициализации платежа через TipTop Pay
  const initiateTipTopPayment = () => {
    console.log('Attempting to initiate payment...')
    console.log('window.cp:', window.cp)
    console.log('window.tiptop:', window.tiptop)
    
    // Определяем доступный объект TipTop Pay
    let TipTopPayClass = null
    
    if (window.cp && typeof window.cp === 'object') {
      console.log('window.cp properties:', Object.keys(window.cp))
      // Ищем правильный класс в объекте cp
      if (window.cp.TipTopPay) {
        TipTopPayClass = window.cp.TipTopPay
        console.log('Using window.cp.TipTopPay')
      } else if (window.cp.Widget) {
        TipTopPayClass = window.cp.Widget
        console.log('Using window.cp.Widget')
      } else if (window.cp.CloudPayments) {
        TipTopPayClass = window.cp.CloudPayments
        console.log('Using window.cp.CloudPayments')
      }
    } else if (window.tiptop && typeof window.tiptop === 'object') {
      console.log('window.tiptop properties:', Object.keys(window.tiptop))
      if (window.tiptop.Widget) {
        TipTopPayClass = window.tiptop.Widget
        console.log('Using window.tiptop.Widget')
      } else if (window.tiptop.TipTopPay) {
        TipTopPayClass = window.tiptop.TipTopPay
        console.log('Using window.tiptop.TipTopPay')
      }
    } else if (window.TipTopPay) {
      TipTopPayClass = window.TipTopPay
      console.log('Using window.TipTopPay')
    }

    if (!TipTopPayClass) {
      alert('TipTop Pay класс не найден. Проверьте консоль для отладки.')
      console.error('No TipTop Pay class found')
      return
    }

    if (!scriptLoaded) {
      alert('TipTop Pay еще загружается. Подождите немного.')
      return
    }

    try {
      console.log('Creating widget with class:', TipTopPayClass)
      const widget = new TipTopPayClass()
      widget.pay({
        publicId: 'pk_5aabb0f09974f172942e79a9997c1',
        description: 'Подписка Premium на год - jol911.kz',
        amount: 4950,
        currency: 'KZT',
        invoiceId: `subscription_${Date.now()}`,
        accountId: userProfile?.phone_number || 'user_subscription',
        email: userProfile?.email || '',
        skin: 'mini',
        language: 'kz'
      }, {
        onSuccess: function(options) {
          // Успешная оплата - вызываем создание подписки
          console.log('Платеж успешен:', options)
          onSubscribe(options.transactionId)
        },
        onFail: function(reason, options) {
          // Ошибка оплаты
          console.error('Ошибка платежа:', reason, options)
          alert('Ошибка при оплате: ' + reason)
        },
        onComplete: function(paymentResult, options) {
          // Завершение процесса (успех или неудача)
          console.log('Платеж завершен:', paymentResult, options)
        }
      })
    } catch (error) {
      console.error('Ошибка при инициализации платежа:', error)
      alert('Ошибка инициализации платежа: ' + error.message)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">{translations.title}</h2>
      {hasActiveSubscription ? (
        <div>
          <p className="text-green-600 mb-2">{translations.active}</p>
          <p>{translations.currentPlan}: Premium</p>
          <p>{translations.expiryDate}: {expiryDate} Дней</p>
        </div>
      ) : (
        <div>
          <p className="text-red-600 mb-2">{translations.inactive}</p>
          {isProfileComplete ? (
            <div>
              <h3 className="text-xl font-semibold mb-2">{translations.choosePlan}</h3>
              
              {/* Статус загрузки скрипта */}
              {!scriptLoaded && !scriptError && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                    <span className="text-yellow-800 text-sm">Загружается TipTop Pay виджет...</span>
                  </div>
                </div>
              )}

              {/* Ошибка загрузки скрипта */}
              {scriptError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="text-red-800 text-sm">
                    <strong>Ошибка загрузки TipTop Pay виджета</strong>
                  </div>
                  <p className="text-red-700 text-xs mt-1">
                    Не удалось загрузить платежный виджет. Обновите страницу.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-md">
                  <h4 className="font-bold">{translations.yearly}</h4>
                  <p>{translations.price}: 4950 тенге {translations.perYear}</p>
                  <button
                    onClick={initiateTipTopPayment}
                    disabled={!scriptLoaded}
                    className={`
                      mt-2 py-2 px-4 rounded-md transition duration-300
                      ${!scriptLoaded 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }
                    `}
                  >
                    {!scriptLoaded ? 'Ожидание загрузки...' : translations.selectPlan}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>{translations.completeProfile}</p>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default Subscription