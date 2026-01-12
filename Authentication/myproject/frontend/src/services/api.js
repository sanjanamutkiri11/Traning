import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registerUser = async (username, password) => {
  try {
    const response = await api.post('/register', { username, password })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' }
  }
}

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' }
  }
}

export const verifyOTP = async (username, otp) => {
  try {
    const response = await api.post('/verify-otp', { username, otp })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' }
  }
}
