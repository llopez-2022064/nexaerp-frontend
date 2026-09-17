import { create } from "zustand"
import { persist } from "zustand/middleware"

const getSafeUser = (user) => ({
    id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.rol
})

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,

            setUser: (user) => {
                set({ user: getSafeUser(user) })
            },

            clearUser: () => {
                set({ user: null })
            }
        }),
        {
            name: 'nexaerp-auth',
            partialize: (state) => ({
                user: state.user
            })
        }
    )
)