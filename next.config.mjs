/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply CSP to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widget.tiptoppay.kz https://acs.tiptoppay.kz https://3ds.tiptoppay.kz https://mc.yandex.ru https://www.googletagmanager.com https://www.google-analytics.com *.tiptoppay.kz",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://widget.tiptoppay.kz *.tiptoppay.kz",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://widget.tiptoppay.kz https://acs.tiptoppay.kz https://3ds.tiptoppay.kz *.tiptoppay.kz",
              "frame-ancestors 'self' https:",
              "frame-src 'self' https://widget.tiptoppay.kz https://acs.tiptoppay.kz https://3ds.tiptoppay.kz *.tiptoppay.kz",
              "connect-src 'self' https://widget.tiptoppay.kz https://acs.tiptoppay.kz https://3ds.tiptoppay.kz https://analytics.tiptoppay.kz https://api2.amplitude.com https://wix.tiptoppay.kz https://static.tiptoppay.kz https://pay.google.com https://google.com https://www.google.com https://mc.yandex.ru https://www.google-analytics.com *.tiptoppay.kz",
              "worker-src 'self' blob:",
              "child-src 'self' https://widget.tiptoppay.kz *.tiptoppay.kz",
            ].join('; ')
          }
        ]
      }
    ]
  }
};

export default nextConfig;
