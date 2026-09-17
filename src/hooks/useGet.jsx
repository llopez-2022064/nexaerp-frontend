import { useState } from 'react'
import { getData } from '../service/api'
import { useCallback } from 'react'

export const useGet = (url) => {
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getElements = useCallback(async () => {
        setError(null)
        setIsLoading(true)

        try {
            const response = await getData(url);

            if (response?.error) {
                throw new Error(
                    response.error.message ??
                    'La respuesta no contiene información'
                )
            }

            setData(response?.data ?? [])
        } catch (requestError) {
            const errorMessage =
                requestError.response?.data?.message ??
                requestError.message ??
                'Ocurrió un error al obtener la información'

            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }, [url])

    return {
        error,
        isLoading,
        data,
        getElements
    }
}
