'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SEOContent = () => {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqData = [
    {
      question: "Как быстро приедет помощь на дорогу в Астане?",
      answer: "Наша служба JOL911 гарантирует прибытие помощи в течение 30 минут в пределах Астаны. Мы работаем круглосуточно 24/7, поэтому помощь доступна в любое время."
    },
    {
      question: "Сколько стоят услуги помощи на дороге?",
      answer: "Годовая подписка на все услуги JOL911 стоит всего 4950 тенге. Это включает трезвого водителя, эвакуатор, зарядку аккумулятора и техническую помощь на дороге."
    },
    {
      question: "В каких районах Астаны работает JOL911?",
      answer: "Мы обслуживаем всю Астану и пригороды в радиусе 100 км. Наши водители знают город и быстро доберутся в любую точку."
    },
    {
      question: "Что включает услуга трезвого водителя?",
      answer: "Профессиональный водитель приедет к вам и доставит вас и ваш автомобиль в нужное место. Услуга доступна круглосуточно по всей Астане."
    },
    {
      question: "Как заказать эвакуатор в Астане?",
      answer: "Позвоните по номеру 8 700 911 99 11 или оформите заявку через наш сайт. Эвакуатор прибудет в течение 30-40 минут."
    },
    {
      question: "Можете ли вы зарядить аккумулятор на месте?",
      answer: "Да, наши мастера приезжают с профессиональным оборудованием для зарядки аккумулятора. Если аккумулятор нельзя восстановить, поможем с заменой."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Section */}
        <section className="mb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
            Часто задаваемые вопросы о помощи на дороге
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-[#FFAD00] hover:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <span className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-16" aria-labelledby="services-detail-heading">
          <h2 id="services-detail-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
            Подробно о наших услугах помощи на дороге
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-[#FFAD00] text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-3">Трезвый водитель Астана</h3>
              <p className="text-gray-600 mb-4">
                Профессиональные водители с опытом более 5 лет. Знают все районы Астаны. 
                Безопасная доставка вас и вашего автомобиля.
              </p>
              <ul className="text-sm text-gray-500">
                <li>• Круглосуточно 24/7</li>
                <li>• Прибытие за 20-30 минут</li>
                <li>• Опытные водители</li>
                <li>• Безопасная езда</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-[#FFAD00] text-4xl mb-4">🚛</div>
              <h3 className="text-xl font-semibold mb-3">Эвакуатор Астана</h3>
              <p className="text-gray-600 mb-4">
                Современные эвакуаторы для любых типов автомобилей. Бережная транспортировка 
                в автосервис или нужное место.
              </p>
              <ul className="text-sm text-gray-500">
                <li>• Грузоподъемность до 3 тонн</li>
                <li>• Эвакуация любых авто</li>
                <li>• Бережная погрузка</li>
                <li>• Доставка в сервис</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-[#FFAD00] text-4xl mb-4">🔋</div>
              <h3 className="text-xl font-semibold mb-3">Зарядка аккумулятора</h3>
              <p className="text-gray-600 mb-4">
                Профессиональное оборудование для зарядки и диагностики аккумулятора. 
                Запуск двигателя на месте.
              </p>
              <ul className="text-sm text-gray-500">
                <li>• Диагностика АКБ</li>
                <li>• Зарядка на месте</li>
                <li>• Запуск двигателя</li>
                <li>• Замена при необходимости</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Coverage Area */}
        <section className="mb-16 bg-white p-8 rounded-lg shadow-md" aria-labelledby="coverage-heading">
          <h2 id="coverage-heading" className="text-3xl font-bold text-gray-900 text-center mb-8">
            География обслуживания JOL911
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Районы Астаны, где мы работаем:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>• Алматинский район</div>
                <div>• Байконурский район</div>
                <div>• Есильский район</div>
                <div>• Сарыаркинский район</div>
                <div>• Центр города</div>
                <div>• Жилые массивы</div>
                <div>• Промзоны</div>
                <div>• Пригороды</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Время прибытия:</h3>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Центр Астаны:</strong> 15-20 минут</li>
                <li><strong>Жилые районы:</strong> 20-30 минут</li>
                <li><strong>Промзоны:</strong> 25-35 минут</li>
                <li><strong>Пригороды:</strong> 30-45 минут</li>
              </ul>
              
              <div className="mt-6 p-4 bg-[#FFAD00] bg-opacity-10 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Важно:</strong> Мы обслуживаем территорию в радиусе 100 км от Астаны. 
                  Для точного времени прибытия звоните по телефону 8 700 911 99 11.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-[#FFAD00] text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Нужна помощь на дороге прямо сейчас?</h2>
          <p className="text-xl mb-6">Звоните круглосуточно - мы всегда готовы помочь!</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="tel:+77009119911" 
              className="bg-white text-[#FFAD00] px-8 py-3 rounded-lg font-bold text-xl hover:shadow-lg transition-shadow"
            >
              📞 8 700 911 99 11
            </a>
            <span className="text-lg">или</span>
            <a 
              href="/auth" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FFAD00] transition-colors"
            >
              Оформить подписку онлайн
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SEOContent
