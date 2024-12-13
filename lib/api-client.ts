import axios from 'axios'
import Cookies from 'js-cookie'
import { API_BASE_URL, API_CONFIG } from './api-config'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  ...API_CONFIG
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = Cookies.get('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized
      Cookies.remove('auth_token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient 