import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../modules/auth/store/useAuthStore'
import { hasPermission } from '../config/permissions'

export const PermissionRoute = ({ requiredPermissions }) => {
    const user = useAuthStore((state) => state.user)

    const canAccess = requiredPermissions.some((permission) => {
        return hasPermission(user?.role, permission)
    })

    if (!canAccess) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}