import Image from 'next/image'

export default function Footer({ t }: any) {
  return (
    <footer className="bg-[#302E2F] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/logo-footer.jpeg" alt="JOL911 Logo" width={100} height={40} className="mb-4 rounded" />
            <p>{t.about}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contact}</h3>
            <p>{t.email}</p>
            <p>{t.phone}</p>
            <p>{t.address}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.links}</h3>
            <ul>
              <li><a href="#" className="hover:text-[#FFAD00]">{t.aboutUs}</a></li>
              <li><a href="/OFERTA.docx" className="hover:text-[#FFAD00]">{t.terms}</a></li>
              <li><a href="#" className="hover:text-[#FFAD00]">{t.privacy}</a></li>
              <li><a href="#" className="hover:text-[#FFAD00]">{t.faq}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 JOL911. {t.rights}</p>
        </div>
      </div>
    </footer>
  )
}