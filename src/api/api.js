import axios from "axios"

const API_BASE_URL = process.env.API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  }

  config.headers = {
    ...defaultHeaders,
    ...config.headers,
  }

  return config
})

export default apiClient
