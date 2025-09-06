import { Car, Shield, Wrench, FileText, Headphones, Zap, DollarSign, PhoneCall } from 'lucide-react'

const services = [
  {
    icon: Car,
    label: { en: 'Sober Driver', ru: 'Трезвый водитель', kz: 'Трезвый водитель' },
    description: {
      en: 'A driver will assist you in any situation.',
      ru: 'Водитель приедет на помощь в любой ситуации.',
      kz: 'Кез келген жағдайға дайын жүргізуші.',
    },
  },
  {
    icon: Shield,
    label: { en: 'Evacuation', ru: 'Эвакуатор', kz: 'Эвакуатор' },
    description: {
      en: 'We will pick you up from any location and take you to our service.',
      ru: 'Заберем вас из любого места и доставим в наш сервис.',
      kz: 'Кез келген жерден алып, біздің сервиске жеткіземіз.',
    },
  },
  {
    icon: Zap,
    label: { en: 'Battery Charge', ru: 'Подзарядка аккумулятора', kz: 'Аккумуляторды зарядтау' },
    description: {
      en: 'A technician will come and charge your battery.',
      ru: 'Мастер приедет и зарядит аккумулятор.',
      kz: 'Мастер келіп, аккумуляторды зарядтайды.',
    },
  },
  {
    icon: Headphones,
    label: { en: '24/7 Support', ru: 'Круглосуточная поддержка', kz: 'Тәулік бойы қолдау' },
    description: {
      en: 'Our dispatchers are available around the clock.',
      ru: 'Наши диспетчеры на связи круглосуточно.',
      kz: 'Біздің диспетчерлер тәулік бойы жұмыс істейді.',
    },
  },
  {
    icon: DollarSign,
    label: { en: 'Affordable Price', ru: 'Выгодная цена', kz: 'Қолайлы баға' },
    description: {
      en: 'Only 3950 KZT per year!',
      ru: 'Всего 3950 тенге в год!',
      kz: 'Жылына бар болғаны 3950 теңге!',
    },
  },
  {
    icon: FileText,
    label: { en: 'Official Contract', ru: 'Официальный договор', kz: 'Ресми келісімшарт' },
    description: {
      en: 'Everything is official and documented.',
      ru: 'Всё официально и документально.',
      kz: 'Барлығы ресми және құжатталған.',
    },
  },
  {
    icon: PhoneCall,
    label: { en: 'Quick Response', ru: 'Быстрая реакция', kz: 'Жедел әрекет' },
    description: {
      en: 'We respond to requests within 5 minutes!',
      ru: 'Мы принимаем и обрабатываем заявки в течение 5 минут!',
      kz: 'Біз сұраныстарды 5 минут ішінде қабылдап, өңдейміз!',
    },
  },
]

export default services