import { UserGroup } from 'lucide-react'
import { Calendar1 } from 'lucide-react'
import { RotateCcwClock } from 'lucide-react'
import { Box } from 'lucide-react'
import { CircleDollarSign } from 'lucide-react'
import { useGet } from '../../../hooks/useGet'
import { useEffect } from 'react'

export const Dashboard = () => {
    const dateCurrent = new Date().toLocaleDateString("es-GT", {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const { getElements: getTotalUsers, data: totalUsers } = useGet('/api/v1/users/total-users')
    const { getElements: getTotalProducts, data: totalProducts } = useGet('/api/v1/products/total-products')

    useEffect(() => {
        getTotalUsers()
        getTotalProducts()
    }, [getTotalUsers, getTotalProducts])

    return (
        <div className="flex-1 overflow-y-auto lg:p-8 dark:bg-dark-bg bg-slate-200/40 rounded-lg pt-4 pr-4 pb-4 pl-4">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Bienvenido</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Resumen</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-9 items-center justify-center space-x-2.5 rounded-lg border border-slate-200 bg-white px-3 shadow-sm dark:border-dark-border dark:bg-dark-card">
                        <Calendar1 />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            {dateCurrent}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:-translate-y-1 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:shadow-none">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">INGRESOS TOTALES</p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">$124,500</h3>
                        </div>
                        <div className="dark:bg-brand-900/20 dark:text-brand-300 text-blue-500 bg-blue-300/20 rounded-lg p-2">
                            <CircleDollarSign />
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:-translate-y-1 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:shadow-none">
                    <div className="flex items-start justify-between">
                        <div className="">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">USUARIOS ACTIVOS</p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{totalUsers}</h3>
                        </div>
                        <div className="dark:bg-purple-900/20 dark:text-purple-300 text-purple-500 bg-purple-200/30 rounded-lg p-2">
                            <UserGroup />
                        </div>
                    </div>
                </div>

                <div className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:shadow-none bg-white border-slate-200 border rounded-xl pt-5 pr-5 pb-5 pl-5 relative shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
                    <div className="flex items-start justify-between">
                        <div className="">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">PRODUCTOS ACTIVOS</p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{totalProducts}</h3>
                        </div>
                        <div className="dark:bg-orange-900/20 dark:text-orange-300 text-orange-600 bg-orange-50 rounded-lg p-2">
                            <Box />
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:-translate-y-1 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:shadow-none">
                    <div className="flex items-start justify-between">
                        <div className="">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">MOVIMIENTOS</p>
                            <h3 className="dark:text-white text-2xl font-semibold text-slate-900 tracking-tight mt-2">4m 32s</h3>
                        </div>
                        <div className="dark:bg-teal-900/20 dark:text-teal-300 text-teal-600 bg-teal-50 rounded-lg p-2">
                            <RotateCcwClock />
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Charts Section --> */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* <!-- Main Chart --> */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-dark-border dark:bg-dark-card lg:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Revenue Growth</h3>
                        <select className="rounded-lg border border-slate-200 bg-transparent px-2 py-1 text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-dark-border dark:text-slate-400">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="relative h-64 w-full">
                        {/* <canvas id="revenueChart" style="display: block; box-sizing: border-box; height: 256px; width: 745.6px;" width="932" height="320" className=""></canvas> */}
                    </div>
                </div>

                {/* <!-- Side Chart --> */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-dark-border dark:bg-dark-card">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Traffic Source</h3>
                        <button className="text-slate-400 hover:text-brand-900 dark:hover:text-white">
                            {/* <iconify-icon icon="solar:menu-dots-linear"></iconify-icon> */}
                        </button>
                    </div>
                    <div className="relative h-48 w-full flex items-center justify-center">
                        {/* <canvas id="trafficChart" style="display: block; box-sizing: border-box; height: 192px; width: 336px;" width="420" height="240" className=""></canvas> */}
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-brand-900"></span>
                                <span className="text-slate-600 dark:text-slate-400">Direct</span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">45%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-brand-400"></span>
                                <span className="text-slate-600 dark:text-slate-400">Social</span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">32%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-600"></span>
                                <span className="text-slate-600 dark:text-slate-400">Referral</span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">23%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Data Table --> */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-dark-border dark:bg-dark-card">
                <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-dark-border">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Transactions</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            {/* <iconify-icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></iconify-icon> */}
                            <input type="text" placeholder="Filter..." className="h-9 w-40 rounded-lg border border-slate-200 bg-transparent pl-9 pr-3 text-sm text-slate-600 focus:border-brand-500 focus:outline-none dark:border-dark-border dark:text-slate-300" />
                        </div>
                        <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-dark-border dark:text-slate-300 dark:hover:bg-white/5">
                            {/* <iconify-icon icon="solar:filter-linear"></iconify-icon> */}
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="">
                            <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-medium uppercase tracking-wide text-slate-500 dark:border-dark-border dark:bg-white/5 dark:text-slate-400">
                                <th className="p-4 w-4">
                                    <input type="checkbox" className="custom-checkbox h-4 w-4 rounded border-slate-300 text-brand-900 focus:ring-0 dark:border-slate-600 dark:bg-dark-bg" />
                                </th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-dark-border text-sm">
                            <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <input type="checkbox" className="custom-checkbox h-4 w-4 rounded border-slate-300 text-brand-900 focus:ring-0 dark:border-slate-600 dark:bg-dark-bg" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-100 to-purple-100 dark:from-brand-900/40 dark:to-purple-900/40 flex items-center justify-center text-xs font-bold text-brand-900 dark:text-brand-200">
                                            JD
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900 dark:text-white">John Doe</span>
                                            <span className="text-xs text-slate-500">john@example.com</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                                        Paid
                                    </span>
                                </td>
                                <td className="p-4 text-slate-500 dark:text-slate-400">Oct 24, 2023</td>
                                <td className="p-4 font-medium text-slate-900 dark:text-white">$350.00</td>
                                <td className="p-4 text-right">
                                    <button className="text-slate-400 hover:text-brand-900 dark:hover:text-white transition-colors">
                                        {/* <iconify-icon icon="solar:menu-dots-linear" width="20"></iconify-icon> */}
                                    </button>
                                </td>
                            </tr>

                            <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <input type="checkbox" className="custom-checkbox h-4 w-4 rounded border-slate-300 text-brand-900 focus:ring-0 dark:border-slate-600 dark:bg-dark-bg" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 flex items-center justify-center text-xs font-bold text-orange-800 dark:text-orange-200">
                                            SM
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900 dark:text-white">Sarah Miller</span>
                                            <span className="text-xs text-slate-500">sarah@studio.io</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                                        Pending
                                    </span>
                                </td>
                                <td className="p-4 text-slate-500 dark:text-slate-400">Oct 23, 2023</td>
                                <td className="p-4 font-medium text-slate-900 dark:text-white">$1,200.00</td>
                                <td className="p-4 text-right">
                                    <button className="text-slate-400 hover:text-brand-900 dark:hover:text-white transition-colors">
                                        {/* <iconify-icon icon="solar:menu-dots-linear" width="20"></iconify-icon> */}
                                    </button>
                                </td>
                            </tr>

                            <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <input type="checkbox" className="custom-checkbox h-4 w-4 rounded border-slate-300 text-brand-900 focus:ring-0 dark:border-slate-600 dark:bg-dark-bg" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-200">
                                            MK
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900 dark:text-white">Mike K.</span>
                                            <span className="text-xs text-slate-500">mike@tech.co</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                                        Paid
                                    </span>
                                </td>
                                <td className="p-4 text-slate-500 dark:text-slate-400">Oct 21, 2023</td>
                                <td className="p-4 font-medium text-slate-900 dark:text-white">$850.00</td>
                                <td className="p-4 text-right">
                                    <button className="text-slate-400 hover:text-brand-900 dark:hover:text-white transition-colors">
                                        {/* <iconify-icon icon="solar:menu-dots-linear" width="20"></iconify-icon> */}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
