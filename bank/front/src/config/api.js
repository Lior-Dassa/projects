// Base URL for all API calls

// Individual endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'http://10.10.1.182:3000',
  LOGIN: `/login`,
  SIGNUP: `/signup`,
  CONFIRM_SIGNUP: `/signup/confirmation`,
  RESEND_CONFIRMATION: `/signup/resend`,
  REFRESH_TOKEN: `/refresh`,
  USER: `/user`,
}

// API configuration
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  }
}