'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function TestPaymentPage() {
  const [paymentResult, setPaymentResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)

  // Загружаем TipTop Pay скрипт
  useEffect(() => {
    const loadScript = () => {
      // Проверяем, уже ли загружен глобальный объект
      if (window.cp && window.cp.TipTopPay) {
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
        console.log('Available objects:', Object.keys(window).filter(key => key.toLowerCase().includes('tip') || key.toLowerCase().includes('pay') || key.toLowerCase().includes('cp')))
        
        // Ждем немного, чтобы убедиться что объект инициализирован
        setTimeout(() => {
          console.log('Checking for TipTop Pay objects...')
          console.log('window.cp:', window.cp)
          console.log('window.tiptop:', window.tiptop)
          
          // Проверяем разные возможные имена объекта
          if (window.cp && typeof window.cp === 'object') {
            console.log('Found window.cp:', Object.keys(window.cp))
            setScriptLoaded(true)
            setScriptError(false)
          } else if (window.tiptop && typeof window.tiptop === 'object') {
            console.log('Found window.tiptop:', Object.keys(window.tiptop))
            setScriptLoaded(true)
            setScriptError(false)
          } else if (window.TipTopPay) {
            console.log('Found window.TipTopPay')
            setScriptLoaded(true)
            setScriptError(false)
          } else {
            console.error('TipTop Pay object not found after script load')
            console.log('Available objects:', Object.keys(window).filter(key => key.toLowerCase().includes('tip') || key.toLowerCase().includes('pay') || key.toLowerCase().includes('cp')))
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
          (window.tiptop && typeof window.tiptop === 'object') || 
          window.TipTopPay) {
        setScriptLoaded(true)
        setScriptError(false)
        clearInterval(checkInterval)
      }
    }, 500)

    // Очищаем интервал через 10 секунд
    const timeout = setTimeout(() => {
      clearInterval(checkInterval)
      if (!scriptLoaded && !window.cp) {
        setScriptError(true)
      }
    }, 10000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeout)
    }
  }, [])

  // Функция инициализации тестового платежа через TipTop Pay
  const initiateTestPayment = () => {
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
      console.log('Available window objects:', Object.keys(window).filter(key => key.toLowerCase().includes('tip') || key.toLowerCase().includes('pay') || key.toLowerCase().includes('cp')))
      return
    }

    if (!scriptLoaded) {
      alert('TipTop Pay еще загружается. Подождите немного.')
      return
    }

    setIsLoading(true)
    setPaymentResult(null)

    try {
      console.log('Creating widget with class:', TipTopPayClass)
      const widget = new TipTopPayClass()
      widget.pay({
        publicId: 'pk_5aabb0f09974f172942e79a9997c1',
        description: 'Тестовый платеж - jol911.kz',
        amount: 100, // 100 тенге для теста
        currency: 'KZT',
        invoiceId: `test_payment_${Date.now()}`,
        accountId: 'test_user',
        email: 'test@example.com',
        skin: 'mini',
        language: 'kz'
      }, {
        onSuccess: function(options) {
          // Успешная оплата
          console.log('Тестовый платеж успешен:', options)
          setPaymentResult({
            status: 'success',
            transactionId: options.transactionId,
            message: 'Платеж успешно завершен!',
            data: options
          })
          setIsLoading(false)
        },
        onFail: function(reason, options) {
          // Ошибка оплаты
          console.error('Ошибка тестового платежа:', reason, options)
          setPaymentResult({
            status: 'error',
            message: `Ошибка при оплате: ${reason}`,
            data: options
          })
          setIsLoading(false)
        },
        onComplete: function(paymentResult, options) {
          // Завершение процесса (успех или неудача)
          console.log('Тестовый платеж завершен:', paymentResult, options)
          setIsLoading(false)
        }
      })
    } catch (error) {
      console.error('Ошибка при инициализации платежа:', error)
      setPaymentResult({
        status: 'error',
        message: `Ошибка инициализации: ${error.message}`,
        data: { error: error.toString() }
      })
      setIsLoading(false)
    }
  }

  // Функция для повторной попытки загрузки скрипта
  const retryLoadScript = () => {
    setScriptError(false)
    setScriptLoaded(false)
    
    // Удаляем старый скрипт
    const oldScript = document.getElementById('tiptop-pay-script')
    if (oldScript) {
      oldScript.remove()
    }
    
    // Перезагружаем страницу для чистой загрузки
    window.location.reload()
  }

  const clearResults = () => {
    setPaymentResult(null)
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#302E2F] mb-4">
            Тестирование TipTop Pay
          </h1>
          <p className="text-gray-600">
            Тестовая страница для проверки интеграции с платежной системой
          </p>
        </div>

        {/* Информация о тесте */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Параметры тестового платежа</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Сумма:</strong> 100 тенге
            </div>
            <div>
              <strong>Валюта:</strong> KZT
            </div>
            <div>
              <strong>Описание:</strong> Тестовый платеж - jol911.kz
            </div>
            <div>
              <strong>Public ID:</strong> pk_5aabb0f09974f172942e79a9997c1
            </div>
          </div>
        </div>

        {/* Статус загрузки скрипта */}
        {!scriptLoaded && !scriptError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-3"></div>
              <span className="text-yellow-800">Загружается TipTop Pay виджет...</span>
            </div>
          </div>
        )}

        {/* Ошибка загрузки скрипта */}
        {scriptError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="text-red-800 mb-3">
              <strong>Ошибка загрузки TipTop Pay виджета</strong>
            </div>
            <p className="text-red-700 text-sm mb-3">
              Не удалось загрузить платежный виджет. Проверьте подключение к интернету.
            </p>
            <button
              onClick={retryLoadScript}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Попробовать снова
            </button>
          </div>
        )}

        {/* Успешная загрузка скрипта */}
        {scriptLoaded && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-green-800">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              TipTop Pay виджет загружен и готов к работе
            </div>
          </div>
        )}

        {/* Кнопка платежа */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Запуск тестового платежа</h3>
          <button
            onClick={initiateTestPayment}
            disabled={isLoading || !scriptLoaded}
            className={`
              px-8 py-3 rounded-lg font-semibold text-white transition duration-300
              ${isLoading || !scriptLoaded
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {isLoading ? 'Обработка...' : 
             !scriptLoaded ? 'Ожидание загрузки...' : 
             'Оплатить 100 тенге'}
          </button>
          
          {paymentResult && (
            <button
              onClick={clearResults}
              className="ml-4 px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition duration-300"
            >
              Очистить результат
            </button>
          )}
        </div>

        {/* Результат платежа */}
        {paymentResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`
              rounded-lg shadow-md p-6 mb-6
              ${paymentResult.status === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
              }
            `}
          >
            <h3 className={`
              text-lg font-semibold mb-3
              ${paymentResult.status === 'success' ? 'text-green-800' : 'text-red-800'}
            `}>
              Результат платежа
            </h3>
            
            <div className={`
              text-sm mb-4
              ${paymentResult.status === 'success' ? 'text-green-700' : 'text-red-700'}
            `}>
              <strong>Статус:</strong> {paymentResult.status === 'success' ? 'Успешно' : 'Ошибка'}
            </div>
            
            <div className={`
              mb-4
              ${paymentResult.status === 'success' ? 'text-green-700' : 'text-red-700'}
            `}>
              {paymentResult.message}
            </div>

            {paymentResult.transactionId && (
              <div className="text-sm text-gray-600 mb-4">
                <strong>ID транзакции:</strong> {paymentResult.transactionId}
              </div>
            )}

            {/* Подробные данные */}
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-gray-600">
                Подробная информация
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(paymentResult.data, null, 2)}
              </pre>
            </details>
          </motion.div>
        )}

        {/* Инструкции для тестирования */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Инструкции для тестирования</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong>1.</strong> Нажмите кнопку "Оплатить 100 тенге"
            </div>
            <div>
              <strong>2.</strong> В открывшейся форме используйте тестовые данные карты
            </div>
            <div>
              <strong>3.</strong> Проверьте результат оплаты в блоке выше
            </div>
            <div>
              <strong>4.</strong> Откройте консоль браузера для просмотра логов
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-sm text-yellow-800">
              <strong>Примечание:</strong> Используйте тестовые карты согласно документации TipTop Pay. 
              Реальные деньги не списываются.
            </div>
          </div>
        </div>

        {/* Ссылка на основную страницу */}
        <div className="text-center mt-8">
          <a 
            href="/profile" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Вернуться к профилю
          </a>
        </div>
      </motion.div>
    </div>
  )
}
