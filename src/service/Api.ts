import axios from 'axios'

const api = axios.create({ baseURL: 'https://backendru.herokuapp.com' })

export default api
