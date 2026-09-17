import { useState } from "react";
import {
    Menu,
    Files,
    X,
    PackageSearch,
    ShoppingCartPlus,
    LayoutDashboard,
    ShelvingUnit,
    Users,
    ClipboardClock,
    BanknoteArrowUp,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../modules/auth/store/useAuthStore";
import { APP } from "../config/configApp";
import { hasPermission, PERMISSIONS } from "../config/permissions";

export const MainLayout = () => {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()
    const clearUser = useAuthStore((state) => state.clearUser)

    const handleLogout = () => {
        localStorage.removeItem('token')
        clearUser()
        navigate('/', { replace: true })
    }

    const links = [
        {
            name: 'Inicio',
            icon: LayoutDashboard,
            url: '/dashboard',
            requiredPermissions: [PERMISSIONS.VIEW_DASHBOARD]
        },
        {
            name: 'Usuarios',
            icon: Users,
            url: '/users',
            requiredPermissions: [PERMISSIONS.VIEW_USERS]
        },
        {
            name: 'Inventario',
            icon: ShelvingUnit,
            url: '/inventory',
            requiredPermissions: [PERMISSIONS.VIEW_INVENTORY]
        },
        {
            name: 'Historial de Inventario',
            icon: ClipboardClock,
            url: '/inventory/history',
            requiredPermissions: [PERMISSIONS.VIEW_INVENTORY_HISTORY]
        },
        {
            name: 'Productos',
            icon: PackageSearch,
            url: '/products',
            requiredPermissions: [PERMISSIONS.VIEW_PRODUCTS]
        },
        {
            name: 'Compras',
            icon: ShoppingCartPlus,
            url: '/shopping',
            requiredPermissions: [PERMISSIONS.VIEW_PURCHASES]
        },
        {
            name: 'Ventas',
            icon: BanknoteArrowUp,
            url: '/sales',
            requiredPermissions: [PERMISSIONS.VIEW_SALES]
        },
        {
            name: 'Reportes',
            icon: Files,
            url: '/reports',
            requiredPermissions: [
                PERMISSIONS.VIEW_SALES_REPORT,
                PERMISSIONS.VIEW_PURCHASES_REPORT,
                PERMISSIONS.VIEW_INVENTORY_REPORT,
                PERMISSIONS.VIEW_INVENTORY_HISTORY_REPORT
            ]
        }
    ]

    const visibleLinks = links.filter((link) => {
        return link.requiredPermissions.some((permission) => {
            return hasPermission(user?.role, permission)
        })
    })

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`
          fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 h-16">
                    {!collapsed && (
                        <h1 className="text-lg font-bold text-gray-800">{APP.name}</h1>
                    )}

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100"
                        >
                            {collapsed ? (
                                <PanelLeftOpen size={18} />
                            ) : (
                                <PanelLeftClose size={18} />
                            )}
                        </button>

                        <button
                            onClick={() => setOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <nav className="p-3 space-y-2">
                    {visibleLinks.map(({ name, icon: Icon, url }) => (
                        <Link
                            key={name}
                            to={url}
                            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-black transition"
                        >
                            <Icon size={20} className="min-w-[20px]" />
                            {!collapsed && <span>{name}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-3 border-t border-gray-200">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 hover:cursor-pointer transition">
                        <LogOut size={20} className="min-w-[20px]" />
                        {!collapsed && <span>Cerrar sesión</span>}
                    </button>
                </div>
            </aside>

            <div
                className={`flex-1 transition-all duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-64"
                    }`}
            >
                <header className="lg:hidden bg-white border-b border-gray-200 px-4 h-16 flex items-center">
                    <button onClick={() => setOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <h2 className="ml-3 font-semibold">{APP.name}</h2>
                </header>

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};