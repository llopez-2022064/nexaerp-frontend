import { api } from '../../../service/api'

export const createSaleRequest = async (sale) => {
    const response = await api.post('/api/v1/sales', sale)
    return response.data
}