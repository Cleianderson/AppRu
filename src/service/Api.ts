import axios from 'axios'

const api = axios.create({ baseURL: 'https://backend-rural-ts.fly.dev' }) // http://192.168.0.114:3000

export default api
