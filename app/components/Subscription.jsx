import React from 'react'
import { motion } from 'framer-motion'

const Subscription = ({ isProfileComplete, hasActiveSubscription, onSubscribe, translations, expiryDate }) => {
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
                  <p>{translations.price}: 3950 тенге {translations.perYear}</p>
                  <button
                    onClick={onSubscribe}
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