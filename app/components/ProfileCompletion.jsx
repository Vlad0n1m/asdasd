import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'

const ProfileCompletion = ({ profile, setProfile, hasActiveSubscription, updateProfile, isLoading }) => {

  const [errors, setErrors] = useState({})
  const [isFormCompleted, setIsFormCompleted] = useState(false)

  useEffect(() => {

    checkFull()
    
  }, [])
  const checkFormCompletion = () => {
    const requiredFields = ['first_name', 'last_name', 'birth_date', 'iin', 'city', 'car_registration_date', 'car_brand', 'car_model', 'car_plate_number']
    const isComplete = requiredFields.every((key) => profile[key] && !errors[key])
    return isComplete
  }

  const checkFull = () => {
    console.log()
    if (checkFormCompletion()) {
      setIsFormCompleted(true)
    } else {
      setIsFormCompleted(false)
    }
    console.log(isFormCompleted);
  }

  const handleInputChange = (e) => {
    checkFull()
    const { name, value } = e.target
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }))
    validateField(name, value)
  }

  const validateField = (name, value) => {
    let error = ''
    if (!value) {
      error = 'Это поле обязательно для заполнения'
    } else {
      switch (name) {
        case 'iin':
          if (!/^\d{12}$/.test(value)) {
            error = 'ИИН должен состоять из 12 цифр'
          }
          break
        case 'birth_date':
        case 'car_registration_date':
          if (!/^\d{4}\/\d{2}\/\d{2}$/.test(value)) {
            error = 'Неверный формат даты'
          }
          break
        case 'car_plate_number':
          if (!/^\d{3}[A-Z]{3}\d{2}$/.test(value)) {
            error = 'Неверный формат номера автомобиля'
          }
          break
        default:
          break
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }))

  }



  const renderInput = (name, label, icon, placeholder, mask = null, isReadOnly = false) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      {mask ? (
        <InputMask
          mask={mask}
          type="text"
          id={name}
          name={name}
          value={profile[name] || ''}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} ${isReadOnly ? 'bg-gray-100' : ''}`}
          required
          disabled={hasActiveSubscription || isLoading}
          readOnly={isReadOnly}
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={profile[name] || ''}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} ${isReadOnly ? 'bg-gray-100' : ''}`}
          required
          disabled={hasActiveSubscription || isLoading}
          readOnly={isReadOnly}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Заполните свой профиль</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput('first_name', 'Имя', '👤', 'Введите ваше имя')}
        {renderInput('last_name', 'Фамилия', '👤', 'Введите вашу фамилию')}
        {renderInput('birth_date', 'Дата рождения', '📅', 'ГГГГ/ММ/ДД', '9999/99/99')}
        {renderInput('iin', 'ИИН', '🆔', 'Введите ваш ИИН', '999999999999')}
        {renderInput('city', 'Город', '🏙', 'Введите ваш город')}
        {renderInput('car_plate_number', 'Номер автомобиля', '🚙', '000ААА01', '999aaa99')}
        {renderInput('car_registration_date', 'Дата регистрации автомобиля', '📅', 'ГГГГ/ММ/ДД', '9999/99/99')}
        {renderInput('car_brand', 'Марка автомобиля', '🚗', 'Введите марку автомобиля')}
        {renderInput('car_model', 'Модель автомобиля', '🚗', 'Введите модель автомобиля')}
        {renderInput('phone_number', 'Номер телефона', '📞', '+7 (000) 000-00-00', '+7 (999) 999-99-99', true)}
      </form>
      <div className="mt-6 flex justify-end">
        <button
          onClick={updateProfile}
          disabled={isLoading || !isFormCompleted}
          className={`px-4 py-2 rounded-md text-white ${isFormCompleted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            } flex items-center`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Сохранение...
            </>
          ) : (
            'Сохранить изменения'
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default ProfileCompletion