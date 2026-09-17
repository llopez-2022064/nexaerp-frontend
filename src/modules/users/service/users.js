import { api } from "../../../service/api"

export const getUsersRequest = async () => {
    const response = await api.get('/api/v1/users')
    return response.data
}

export const createUserRequest = async (data) => {
    const response = await api.post('/api/v1/auth/sign-up', data)
    return response.data
}

export const updateUserRequest = async (id, data) => {
    const response = await api.patch(`/api/v1/users/${id}`, data)
    return response.data
}

export const deleteUserRequest = async (id) => {
    const response = await api.delete(`/api/v1/users/${id}`)
    return response.data
}
