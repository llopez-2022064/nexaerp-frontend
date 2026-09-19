import logo from '../../../assets/images/nexaerp_logo.png'
import { useLogin } from '../../../hooks/useLogin'
import { useState } from 'react'

export const Login = () => {
    const { login, error, isLoading } = useLogin()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        login(formData)
    }

    return (
        <main class="bg-gray-50 px-4 md:px-8">
            <div class="min-h-screen flex flex-col items-center justify-center">
                <div class="max-w-md w-full">
                    <a href="/">
                        <img src={logo} alt="Logo NexaERP"
                        class="size-32 mb-8 mx-auto block" />
                    </a>

                    <div
                        class="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8">
                        <h1 class="text-center text-3xl font-bold text-secondary">Iniciar Sesión</h1>

                        <form onSubmit={handleSubmit} class="space-y-6 mt-10">
                            <div>
                                <label for="email"
                                    class="mb-2 text-slate-900 font-medium text-sm inline-block">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="administrador@gmail.com"
                                    onChange={handleChange}
                                    required
                                    class="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                                />
                            </div>
                            <div>
                                <label for="password"
                                    class="mb-2 text-slate-900 font-medium text-sm inline-block">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    required
                                    class="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                                />
                            </div>

                            <button type="submit"
                                class="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-[#3764F1] bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                disabled={isLoading}
                            >
                                Iniciar Sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
