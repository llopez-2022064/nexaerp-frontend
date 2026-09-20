import { ArrowRight, CalendarDays, User, UserKey } from 'lucide-react'
import { Link } from 'react-router'
import { hasPermission } from '../../../config/permissions'
import { useAuthStore } from '../../auth/store/useAuthStore'
import { REPORTS } from '../../reports/config/reports'

export const Dashboard = () => {
    const user = useAuthStore((state) => state.user)
    const availableReports = REPORTS.filter((report) => hasPermission(user?.role, report.permission))

    const dateCurrent = new Date().toLocaleDateString("es-GT", {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <div className="flex-1 overflow-y-auto lg:p-8 dark:bg-dark-bg bg-slate-200/40 rounded-lg pt-4 pr-4 pb-4 pl-4">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        Bienvenido a <strong className='text-primary'>Nexa</strong><strong className='text-secondary'>ERP</strong>
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Resumen</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:-translate-y-1 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:shadow-none">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">HOLA</p>
                            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                {user.name} {user.lastName}
                            </h3>
                        </div>
                        <div className="dark:bg-brand-900/20 dark:text-brand-300 text-blue-500 bg-blue-300/20 rounded-lg p-2">
                            <User />
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:-translate-y-1 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:shadow-none">
                    <div className="flex items-start justify-between">
                        <div className="">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">ROL</p>
                            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{user.role}</h3>
                        </div>
                        <div className="dark:bg-purple-900/20 dark:text-purple-300 text-purple-500 bg-purple-200/30 rounded-lg p-2">
                            <UserKey />
                        </div>
                    </div>
                </div>

                <div className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:shadow-none bg-white border-slate-200 border rounded-xl pt-5 pr-5 pb-5 pl-5 relative shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
                    <div className="flex items-start justify-between">
                        <div className="">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">FECHA</p>
                            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{dateCurrent}</h3>
                        </div>
                        <div className="dark:bg-orange-900/20 dark:text-orange-300 text-orange-600 bg-orange-50 rounded-lg p-2">
                            <CalendarDays />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <section aria-labelledby="reports-title" className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-dark-border dark:bg-dark-card">
                    <h2 id="reports-title" className="text-base font-semibold text-slate-900 dark:text-white mb-4">Reportes Disponibles</h2>
                    {availableReports.length > 0 ? (
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                {availableReports.map(({ id, title, icon: Icon, iconClassName }) => (
                                    <div key={id} className='bg-gray-100 rounded-lg p-5'>
                                        <div className="flex items-center gap-3">
                                            <span className={`shrink-0 rounded-lg p-2 ${iconClassName}`}>
                                                <Icon size={20} aria-hidden="true" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="font-medium text-slate-900 dark:text-white">{title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to="/reports" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                Ir a reportes <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                        </>
                    ) : (
                        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">No tienes reportes disponibles</p>
                    )}
                </section>
            </div>
        </div>
    )
}
