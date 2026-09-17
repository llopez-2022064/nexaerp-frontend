import { useState } from "react"
import { loginRequest } from "../modules/auth/service/auth"
import { useNavigate } from "react-router"
import { useAuthStore } from "../modules/auth/store/useAuthStore"
import { gooeyToast } from "goey-toast"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const setUser = useAuthStore((state) => state.setUser)

    const login = async (credentials) => {
        setError(null)
        setIsLoading(true)

        try {
            const response = await loginRequest(credentials)

            if (!response?.token || !response?.loggedUser) {
                throw new Error('La respuesta de inicio de sesión está incompleta')
            }

            localStorage.setItem('token', response.token)
            setUser(response.loggedUser)

            gooeyToast.success(`Bienvenido ${response.loggedUser?.name ?? ''}`, {
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            })

            navigate('/dashboard')
        } catch (requestError) {
            const errorMessage =
                requestError.response?.data?.message ??
                requestError.message ??
                'No fue posible iniciar sesión'

            setError(errorMessage)

            gooeyToast.error('No fue posible iniciar sesión', {
                description: errorMessage,
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        login,
        error,
        isLoading
    }
}
