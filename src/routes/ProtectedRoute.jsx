import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../modules/auth/store/useAuthStore"

export const ProtectedRoute = () => {
    const user = useAuthStore((state) => state.user)
    const token = localStorage.getItem('token')

    if (!token || !user) {
        return <Navigate to='/' replace />
    }
    return <Outlet />
}
