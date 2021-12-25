import axios from 'axios'

const api = axios.create({ baseURL: 'http://192.168.0.114:3000' }) // https://backendru.herokuapp.com

export default api
