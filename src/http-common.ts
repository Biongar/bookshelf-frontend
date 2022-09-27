// https://www.bezkoder.com/vue-3-typescript-axios/
// Дополнительно: https://lazypandatech.com/blog/Vue/33/How-to-create-Axios-Interceptor-for-Vue-with-TypeScript/
//
import axios from 'axios'
import type { AxiosInstance } from 'axios'

let baseURL: string

if (import.meta.env.VITE_ENV_TYPE === 'dev' && import.meta.env.DEV) {
  baseURL = 'http://localhost:8000/api/v1'
} else if (import.meta.env.VITE_ENV_TYPE === 'prod' && import.meta.env.PROD) {
  baseURL = 'https://xxxxxxx/api/v1'
} else {
  baseURL = '/api/v1'
}

const apiClient: AxiosInstance = axios.create({
  baseURL: baseURL,
  //withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
