import { ChartNoAxesCombined, Package, ReceiptText, ShoppingBag } from 'lucide-react'
import { PERMISSIONS } from '../../../config/permissions'

export const REPORTS = [
    {
        id: 'sales',
        title: 'Reporte de ventas',
        permission: PERMISSIONS.VIEW_SALES_REPORT,
        icon: ChartNoAxesCombined,
        iconClassName: 'bg-blue-100 text-blue-600'
    },
    {
        id: 'purchases',
        title: 'Reporte de compras',
        permission: PERMISSIONS.VIEW_PURCHASES_REPORT,
        icon: ShoppingBag,
        iconClassName: 'bg-emerald-100 text-emerald-600'
    },
    {
        id: 'inventory',
        title: 'Reporte de inventario',
        permission: PERMISSIONS.VIEW_INVENTORY_REPORT,
        icon: Package,
        iconClassName: 'bg-amber-100 text-amber-600'
    },
    {
        id: 'inventory-history',
        title: 'Historial de inventario',
        permission: PERMISSIONS.VIEW_INVENTORY_HISTORY_REPORT,
        icon: ReceiptText,
        iconClassName: 'bg-violet-100 text-violet-600'
    }
]
