import axios from "axios";


export const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => Promise.reject(error)
)

export const getData = async (url) => {
    const response = await api.get(`${url}`)
    return response.data
}