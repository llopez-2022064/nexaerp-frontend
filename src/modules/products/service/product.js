import { api } from "../../../service/api"

export const createProductRequest = async (product) => {
    const response = await api.post(`/api/v1/products`, product)
    return response
}

export const updateProductRequest = async (id, product) => {
    const response = await api.patch(`/api/v1/products/${id}`, product)
    return response
}

export const deleteProductRequest = async (id) => {
    const response = await api.delete(`/api/v1/products/${id}`)
    return response
}