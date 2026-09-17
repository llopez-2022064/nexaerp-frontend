import {
    ChartNoAxesCombined,
    FileText,
    Package,
    ReceiptText,
    Sheet,
    ShoppingBag
} from 'lucide-react'
import { useAuthStore } from '../../../modules/auth/store/useAuthStore'
import { hasPermission, PERMISSIONS } from '../../../config/permissions'

const REPORTS = [
    {
        id: 'sales',
        title: 'Reporte de ventas',
        description: 'Consulta las ventas realizadas y sus cantidades por producto.',
        permission: PERMISSIONS.VIEW_SALES_REPORT,
        icon: ChartNoAxesCombined,
        iconClassName: 'bg-blue-100 text-blue-600'
    },
    {
        id: 'purchases',
        title: 'Reporte de compras',
        description: 'Revisa las compras registradas y sus costos unitarios.',
        permission: PERMISSIONS.VIEW_PURCHASES_REPORT,
        icon: ShoppingBag,
        iconClassName: 'bg-emerald-100 text-emerald-600'
    },
    {
        id: 'inventory',
        title: 'Reporte de inventario',
        description: 'Obtén las existencias actuales de cada producto.',
        permission: PERMISSIONS.VIEW_INVENTORY_REPORT,
        icon: Package,
        iconClassName: 'bg-amber-100 text-amber-600'
    },
    {
        id: 'inventory-history',
        title: 'Historial de inventario',
        description: 'Consulta los movimientos que modificaron las existencias.',
        permission: PERMISSIONS.VIEW_INVENTORY_HISTORY_REPORT,
        icon: ReceiptText,
        iconClassName: 'bg-violet-100 text-violet-600'
    }
]

export const Reports = () => {
    const user = useAuthStore((state) => state.user)
    const availableReports = REPORTS.filter((report) => hasPermission(user?.role, report.permission))

    return (
        <section className="rounded-xl bg-slate-200/40 p-4 lg:p-8">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reportes</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Selecciona un reporte y el formato que deseas generar.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {availableReports.map(({ id, title, description, icon: Icon, iconClassName }) => (
                    <article
                        key={id}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`rounded-lg p-3 ${iconClassName}`}>
                                <Icon size={24} aria-hidden="true" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">{title}</h2>
                                <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
                            >
                                <FileText size={18} aria-hidden="true" />
                                Exportar PDF
                            </button>
                            <button
                                type="button"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            >
                                <Sheet size={18} aria-hidden="true" />
                                Exportar Excel
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
