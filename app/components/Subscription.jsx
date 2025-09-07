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
    if (!window.cp) {
      console.error('TipTop Pay API not available')
      alert('TipTop Pay не загружен. Попробуйте позже.')
      return
    }

    // Логируем доступные методы для отладки
    console.log('Available cp methods:', Object.keys(window.cp))
    console.log('Full cp object:', window.cp)

    try {
      // Используем правильную структуру API: CloudPayments конструктор
      if (typeof window.cp.CloudPayments !== 'undefined') {
        const widget = new window.cp.CloudPayments()
        
        if (widget && typeof widget.pay === 'function') {
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
              console.log('Платеж успешен:', options)
              onSubscribe(options.transactionId)
            },
            onFail: function(reason, options) {
              console.error('Ошибка платежа:', reason, options)
              alert('Ошибка при оплате: ' + reason)
            },
            onComplete: function(paymentResult, options) {
              console.log('Платеж завершен:', paymentResult, options)
            }
          })
        } else {
          console.error('CloudPayments widget created but no pay method available')
          alert('Ошибка инициализации платежного виджета.')
        }
      } else if (typeof window.cp.Widget !== 'undefined') {
        // Альтернативный подход с Widget
        const widget = new window.cp.Widget()
        
        if (widget && typeof widget.pay === 'function') {
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
              console.log('Платеж успешен:', options)
              onSubscribe(options.transactionId)
            },
            onFail: function(reason, options) {
              console.error('Ошибка платежа:', reason, options)
              alert('Ошибка при оплате: ' + reason)
            },
            onComplete: function(paymentResult, options) {
              console.log('Платеж завершен:', paymentResult, options)
            }
          })
        } else {
          console.error('Widget created but no pay method available')
          alert('Ошибка инициализации платежного виджета.')
        }
      } else {
        console.error('No suitable payment method found in cp object')
        console.log('Available methods:', Object.keys(window.cp))
        alert('Ошибка инициализации TipTop Pay. API недоступен.')
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