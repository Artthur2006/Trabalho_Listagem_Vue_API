import axios from 'axios'

const api = axios.create({
    baseURL: 'api.mh.api.com'
})

export default api