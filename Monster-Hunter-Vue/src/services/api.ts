import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.mh-api.com/v1'
})

export default api