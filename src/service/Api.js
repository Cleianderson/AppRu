import axios from 'axios'
//https://backendru.herokuapp.com
const api = axios.create({ baseURL: 'http://192.168.1.103:9999' })

export default api
