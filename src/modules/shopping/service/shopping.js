import { api } from "../../../service/api"

export const createShoppingRequest = async (shopping) => {
    const response = await api.post('/api/v1/shopping', shopping)
    return response
}