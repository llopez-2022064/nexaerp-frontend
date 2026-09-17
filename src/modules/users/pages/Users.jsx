import { UserRoundPlus } from 'lucide-react'
import { Table } from '../../../components/Table'
import { useGet } from '../../../hooks/useGet'
import { useEffect } from 'react'
import { Trash } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { InputLabel } from '../../../components/InputLabel'
import { createUserRequest, deleteUserRequest, updateUserRequest } from '../service/users'
import { InputSelect } from '../../../components/InputSelect'
import { Skeleton } from '../../../components/Skeleton'
import { gooeyToast } from 'goey-toast'
import { Modal } from '../../../components/Modal'

export const Users = () => {
    const { data, isLoading, error, getElements } = useGet('/api/v1/users')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userEdit, setUserEdit] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        rol: ""
    })

    const openCreate = () => {
        setUserEdit(null)

        setFormData({
            name: '',
            lastName: '',
            email: '',
            password: '',
            rol: '',
        })

        setIsModalOpen(true)
    }

    const openEdit = (user) => {
        setUserEdit(user)

        setFormData({
            name: user.name || '',
            lastName: user.lastName || '',
            email: user.email || '',
            password: '',
            rol: user.rol || '',
        })

        setIsModalOpen(true)
    }

    const refreshUsers = () => {
        getElements()
    }

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let wasSuccessful

        if (userEdit) {
            wasSuccessful = await handleEdit(userEdit._id, formData)
        } else {
            wasSuccessful = await handleCreate(formData)
        }

        if (wasSuccessful) {
            setIsModalOpen(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Desea eliminar este usuario?')

        if (!confirmed) return

        try {
            await deleteUserRequest(id)
            getElements()

            gooeyToast.success('Se ha eliminado con éxito', {
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            });
            return true
        } catch (error) {
            gooeyToast.error('Error al eliminar el usuario', {
                description: 'No se pudo eliminar el registro. Inténtalo otra vez',
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            })
            return false
        }
    }

    const handleCreate = async (user) => {
        if (!user) return

        try {
            await createUserRequest(user)
            getElements()

            gooeyToast.success('Se ha creado el usuario con éxito', {
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            });
            return true
        } catch (error) {
            gooeyToast.error('Error al crear usuario', {
                description: 'No se pudo crear el registro. Inténtalo nuevamente',
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            })
            return false
        }
    }

    const handleEdit = async (id, user) => {
        if (!id || !user) return

        try {
            const { password, ...userWithoutPassword } = user
            const dataToUpdate = password ? user : userWithoutPassword

            await updateUserRequest(id, dataToUpdate)
            getElements()

            gooeyToast.success('Se ha actualizado con éxito', {
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            });
            return true
        } catch (error) {
            gooeyToast.error('Error al actualizar usuario', {
                description: 'No se pudo actualizar el registro. Inténtalo nuevamente',
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            })
            return false
        }
    }

    const roles = [
        { _id: 'Administrador', name: 'Administrador' },
        { _id: 'Operativo', name: 'Operativo' },
        { _id: 'Tecnico', name: 'Tecnico' }
    ]

    const columns = [
        {
            header: 'No.',
            cell: (item, indexRow) => indexRow + 1
        },
        {
            header: 'Nombre Completo',
            cell: (item) => item.name + ' ' + item.lastName
        },
        {
            header: 'Email',
            cell: (item) => item.email
        },
        {
            header: 'Rol',
            cell: (item) => item.rol
        },
        {
            header: 'Fecha de Creación',
            cell: (item) => item.createdAt
        },
        {
            header: 'Acciones',
            cell: (item) => (
                <div className='flex justify-center items-center space-x-2.5'>
                    <button type='button' onClick={() => handleDelete(item._id)} className='text-red-600 cursor-pointer'>
                        <Trash className="size-5" />
                    </button>
                    <button type='button' onClick={() => openEdit(item)} className='text-blue-600 cursor-pointer'>
                        <Pencil className="size-5" />
                    </button>
                </div>
            )
        }
    ]

    useEffect(() => {
        getElements()
    }, [getElements])

    if (isLoading) {
        <Skeleton />
    }

    return (
        <div>
            <div className='flex justify-between bg-white rounded-lg px-4 py-2 mb-2'>
                <h2 className='font-bold text-lg'>Usuarios</h2>
                <div className='flex justify-center items-center space-x-5'>
                    <button onClick={openCreate} className='text-green-500 cursor-pointer'>
                        <UserRoundPlus />
                    </button>
                    <button onClick={refreshUsers} className='text-sky-400 cursor-pointer'>
                        <RefreshCw className='hover:animate-spin' />
                    </button>
                </div>
            </div>

            <Table columns={columns} data={data} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={userEdit ? "Editar Usuario" : "Nuevo Usuario"}
            >
                <form onSubmit={handleSubmit}>
                    <InputLabel id='name' title='Nombre' typeInput='text' valueInput={formData.name} placeholder='Nicole' handleChange={handleChange} />

                    <InputLabel id='lastName' title='Apellido' typeInput='text' valueInput={formData.lastName} placeholder='García' handleChange={handleChange} />

                    <InputLabel id='email' title='Email' typeInput='email' valueInput={formData.email} placeholder='ngarcia@gmail.com' handleChange={handleChange} />

                    <InputLabel id='password' title='Contraseña' typeInput='password' valueInput={formData.password} placeholder='********' handleChange={handleChange} />

                    <InputSelect
                        id='rol'
                        title='Rol'
                        data={roles}
                        valueInput={formData.rol}
                        handleChange={handleChange}
                    />

                    <div className='flex gap-2 mt-3'>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-red-400 hover:bg-red-600 transition duration-300 text-white py-2 rounded-lg cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
