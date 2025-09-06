import { tokenService } from './tokenService';

const API_URL = 'api/v1';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function Login(phone, password) {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone_number: phone, password }),
  });

  const data = await handleResponse(response);
  tokenService.setTokens(data.access_token, data.refresh_token);
  return data;
}

export async function Register(name , surname , phone , password , password2 ) {
  const response = await fetch(`${API_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone_number: phone,
      first_name: name,
      last_name: surname,
      password,
      password2,
    }),
  });

  const data = await handleResponse(response);
  return Login(phone, password);
}

async function refreshAccessToken() {
  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await handleResponse(response);
  tokenService.setTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

export async function fetchWithToken(endpoint , options = {}) {
  let accessToken = tokenService.getAccessToken();

  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    try {
      accessToken = await refreshAccessToken();
      return fetchWithToken(endpoint, options);
    } catch (error) {
      tokenService.clearTokens();
      throw new Error('Session expired. Please log in again.');
    }
  }

  return handleResponse(response);
}

export async function postWithToken(endpoint , data, options = {}) {
  return fetchWithToken(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}