import { api } from "../../../service/api";

export const loginRequest = async (credentials) => {
    const response = await api.post('/api/v1/auth/sign-in', credentials)
    return response.data

}