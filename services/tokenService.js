import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenService = {
  setTokens(accessToken, refreshToken) {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { secure: true, sameSite: 'strict' });
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { secure: true, sameSite: 'strict' });
  },

  getAccessToken() {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  clearTokens() {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
};