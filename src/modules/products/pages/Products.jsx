import { Table } from '../../../components/Table'
import { useGet } from '../../../hooks/useGet'
import { useEffect } from 'react'
import { APP } from '../../../config/configApp'
import { RefreshCw } from 'lucide-react'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { InputLabel } from '../../../components/InputLabel'
import { Trash } from 'lucide-react'
import { Modal } from '../../../components/Modal'
import { Pencil } from 'lucide-react'
import { createProductRequest, deleteProductRequest, updateProductRequest } from '../service/product'
import { gooeyToast } from 'goey-toast'
import { useAuthStore } from '../../auth/store/useAuthStore'
import { hasPermission, PERMISSIONS } from '../../../config/permissions'

export const Products = () => {
    const { getElements, data } = useGet('/api/v1/products')
    const user = useAuthStore((state) => state.user)
    const canCreateProduct = hasPermission(
        user?.role,
        PERMISSIONS.CREATE_PRODUCTS
    )
    const canUpdateProduct = hasPermission(
        user?.role,
        PERMISSIONS.UPDATE_PRODUCTS
    )
    const canUDeleteProduct = hasPermission(
        user?.role,
        PERMISSIONS.DELETE_PRODUCTS
    )
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [productEdit, setProductEdit] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        sellingPrice: ''
    })

    const clearForm = () => {
        setFormData({
            name: '',
            brand: '',
            sellingPrice: ''
        })
    }

    const openCreate = () => {
        setProductEdit(null)
        clearForm()
        setIsModalOpen(true)
    }

    const openEdit = (product) => {
        setProductEdit(product)
        setFormData({
            name: product.name || '',
            brand: product.brand || '',
            sellingPrice: product.sellingPrice || 0
        })
        setIsModalOpen(true)
    }

    const refreshProducts = () => {
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

        if (productEdit) {
            wasSuccessful = await handleUpdate(productEdit._id, formData)
        } else {
            wasSuccessful = await handleCreate(formData)
        }

        if (wasSuccessful) {
            setIsModalOpen(false)
        }
    }

    const handleCreate = async (product) => {
        if (!product) return

        try {
            await createProductRequest(product)
            getElements()

            gooeyToast.success('Se ha creado el producto con éxito', {
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            })
            return true
        } catch (error) {
            gooeyToast.error('Error al crear producto', {
                description: 'No se pudo crear el registro. Inténtalo nuevamente',
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            })
            return false
        }
    }

    const handleUpdate = async (id, product) => {
        if (!id || !product) return

        try {
            await updateProductRequest(id, product)
            getElements()

            gooeyToast.success('Se ha actualizado con éxito', {
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            });
            return true
        } catch (error) {
            gooeyToast.error('Error al crear producto', {
                description: 'No se pudo actualizar el registro. Inténtalo nuevamente',
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            })
            return false
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Desea eliminar este usuario?')

        if (!confirmed) return

        try {
            await deleteProductRequest(id)
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

    const columns = [
        {
            header: 'No.',
            cell: (item, rowIndex) => rowIndex + 1
        },
        {
            header: 'Name',
            cell: (item) => item.name
        },
        {
            header: 'Marca',
            cell: (item) => item.brand
        },
        {
            header: 'Precio Unitario',
            cell: (item) => (
                <span>
                    {APP.currency} {item.sellingPrice}
                </span>
            )
        },
        {
            header: 'Acciones',
            cell: (item) => (
                <div className='flex justify-center items-center space-x-2.5'>
                    {canUDeleteProduct && (
                        <button onClick={() => handleDelete(item._id)} type='button' className='text-red-600 cursor-pointer'>
                            <Trash className="size-5" />
                        </button>
                    )}
                    {canUpdateProduct && (
                        <button type='button' onClick={() => openEdit(item)} className='text-blue-600 cursor-pointer'>
                            <Pencil className="size-5" />
                        </button>
                    )}
                </div>
            )
        }
    ]

    useEffect(() => {
        getElements()
    }, [getElements])

    return (
        <div>
            <div className='flex justify-between bg-white rounded-lg px-4 py-2 mb-2'>
                <h2 className='font-bold text-lg'>Productos</h2>
                <div className='flex justify-center items-center space-x-5'>
                    {canCreateProduct && (
                        <button onClick={openCreate} className='text-green-500 cursor-pointer'>
                            <CirclePlus />
                        </button>
                    )}
                    <button onClick={refreshProducts} className='text-sky-400 cursor-pointer'>
                        <RefreshCw className='hover:animate-spin' />
                    </button>
                </div>
            </div>

            <Table columns={columns} data={data} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={productEdit ? "Editar Producto" : "Nuevo Producto"}
            >
                <form onSubmit={handleSubmit}>
                    <InputLabel id='name' title='Nombre' typeInput='text' valueInput={formData.name} placeholder='Laptop' handleChange={handleChange} />

                    <InputLabel id='brand' title='Marca' typeInput='text' valueInput={formData.brand} placeholder='Lenovo' handleChange={handleChange} />

                    <InputLabel id='sellingPrice' title='Precio de Venta' typeInput='text' valueInput={formData.sellingPrice} placeholder='1700.99' handleChange={handleChange} />

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
