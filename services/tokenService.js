import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenService = {
  setTokens(accessToken, refreshToken) {
    if (typeof window === 'undefined') return;
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { secure: true, sameSite: 'strict' });
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { secure: true, sameSite: 'strict' });
  },

  getAccessToken() {
    if (typeof window === 'undefined') return null;
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    if (typeof window === 'undefined') return null;
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  clearTokens() {
    if (typeof window === 'undefined') return;
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
};