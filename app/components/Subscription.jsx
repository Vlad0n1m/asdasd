import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const Subscription = ({ isProfileComplete, hasActiveSubscription, onSubscribe, translations, expiryDate, userProfile }) => {
  
  // Загружаем TipTop Pay скрипт
  useEffect(() => {
    if (!document.getElementById('tiptop-pay-script')) {
      const script = document.createElement('script')
      script.id = 'tiptop-pay-script'
      script.src = 'https://widget.tiptoppay.kz/bundles/widget.js'
      script.async = true
      
      // Добавляем обработчики для лучшего контроля загрузки
      script.onload = () => {
        console.log('TipTop Pay script loaded successfully')
        // Даем немного времени для инициализации API
        setTimeout(() => {
          if (window.cp) {
            console.log('TipTop Pay API available:', Object.keys(window.cp))
          } else {
            console.error('TipTop Pay API still not available after script load')
          }
        }, 100)
      }
      
      script.onerror = () => {
        console.error('Failed to load TipTop Pay script')
      }
      
      document.head.appendChild(script)
    }
  }, [])

  // Функция инициализации платежа через TipTop Pay
  const initiateTipTopPayment = () => {
    // Проверяем доступность TipTop Pay API
    if (!window.tiptop) {
      console.error('TipTop Pay API not available')
      alert('TipTop Pay не загружен. Попробуйте позже.')
      return
    }

    // Логируем доступные методы для отладки
    console.log('Available tiptop methods:', Object.keys(window.tiptop))
    console.log('Full tiptop object:', window.tiptop)

    try {
      // Используем правильную структуру API: новый TipTop Pay Widget
      if (typeof window.tiptop.Widget !== 'undefined') {
        const widget = new window.tiptop.Widget()
        
        // Параметры для TipTop Pay согласно документации
        const intentParams = {
          publicTerminalId: 'test_api_00000000000000000000002', 
          description: 'Подписка Premium на год - jol911.kz',
          paymentSchema: 'Single', // одностадийная оплата
          currency: 'KZT',
          amount: 4950,
          externalId: `subscription_${Date.now()}`, // идентификатор платежа
          userInfo: {
            accountId: userProfile?.phone_number || 'user_subscription',
            firstName: userProfile?.first_name || 'User',
            lastName: userProfile?.last_name || 'User',
            phone: userProfile?.phone_number || '',
            email: userProfile?.email || ''
          },
          items: [{
            id: 'premium_subscription_yearly',
            name: 'Premium подписка на год',
            count: 1,
            price: 4950
          }],
          receipt: {
            items: [{
              label: 'Premium подписка на год - jol911.kz',
              price: 4950.00,
              quantity: 1.00,
              amount: 4950.00,
              vat: 0,
              measurementUnit: 'шт'
            }],
            calculationPlace: 'jol911.kz',
            taxationSystem: 0,
            email: userProfile?.email || '',
            phone: userProfile?.phone_number || '',
            isBso: false,
            amounts: {
              electronic: 4950.00,
              cash: 0.00
            }
          },
          successRedirectUrl: window.location.origin + '/profile?payment=success',
          failRedirectUrl: window.location.origin + '/profile?payment=failed',
          receiptEmail: userProfile?.email || ''
        }
        
        // Запускаем виджет
        widget.start(intentParams).then(function(widgetResult) {
          console.log('TipTop Pay result:', widgetResult)
          // Успешная оплата
          if (widgetResult && (widgetResult.status == 'success' || widgetResult.transactionId)) {
            onSubscribe()
          }
        }).catch(function(error) {
          console.error('TipTop Pay error:', error)
          alert('Ошибка при оплате: ' + (error.message || error))
        })
        
      } else {
        console.error('TipTop Pay Widget not found')
        alert('Ошибка инициализации TipTop Pay. Виджет недоступен.')
      }
    } catch (error) {
      console.error('Error initializing TipTop Pay payment:', error)
      alert('Ошибка инициализации платежа. Попробуйте позже.')
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-md">
                  <h4 className="font-bold">{translations.yearly}</h4>
                  <p>{translations.price}: 4950 тенге {translations.perYear}</p>
                  <button
                    onClick={initiateTipTopPayment}
                    className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    {translations.selectPlan}
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