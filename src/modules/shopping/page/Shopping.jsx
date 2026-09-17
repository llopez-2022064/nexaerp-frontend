import { useGet } from '../../../hooks/useGet'
import { Table } from '../../../components/Table'
import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { CirclePlus } from 'lucide-react'
import { InputLabel } from '../../../components/InputLabel'
import { InputSelect } from '../../../components/InputSelect'
import { createShoppingRequest } from '../service/shopping'
import { gooeyToast } from 'goey-toast'
import { Modal } from '../../../components/Modal'

export const Shopping = () => {
    const { getElements: getShopping, data, isLoading, error } = useGet('/api/v1/shopping')
    const { getElements: getProducts, data: products } = useGet('/api/v1/products')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        product: "",
        amount: "",
        unitCost: ""
    })

    const openCreate = () => {
        setFormData({
            product: "",
            amount: "",
            unitCost: ""
        })

        setIsModalOpen(true)
    }

    const refreshShopping = () => {
        getShopping()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let wasSuccessful = await handleCreate(formData)

        if (wasSuccessful) {
            setIsModalOpen(false)
        }
    }

    const handleCreate = async (shopping) => {
        if (!shopping) return

        try {
            await createShoppingRequest(shopping)
            getShopping()

            gooeyToast.success('Se ha guardado la compra con éxito', {
                borderColor: '#E0E0E0',
                borderWidth: 1.5,
                preset: 'smooth',
                showProgress: true,
            });
            return true
        } catch (error) {
            gooeyToast.error('Error al guardar la compra', {
                description: 'No se pudo guardar el registro. Inténtalo nuevamente',
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
            header: 'Producto',
            cell: (item) => item?.product?.name
        },
        {
            header: 'Cantidad',
            cell: (item) => item.amount
        },
        {
            header: 'Costo Unitario',
            cell: (item) => item.unitCost
        },
        {
            header: 'Fecha',
            cell: (item) => item.purchaseDate
        }
    ]

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        getShopping()
        getProducts()
    }, [getShopping, getProducts])

    return (
        <div>
            <div className='flex justify-between bg-white rounded-lg px-4 py-2 mb-2'>
                <h2 className='font-bold text-lg'>Compras</h2>
                <div className='flex justify-center items-center space-x-5'>
                    <button onClick={openCreate} className='text-green-500 cursor-pointer'>
                        <CirclePlus />
                    </button>
                    <button onClick={refreshShopping} className='text-sky-400 cursor-pointer'>
                        <RefreshCw className='hover:animate-spin' />
                    </button>
                </div>
            </div>

            <Table columns={columns} data={data} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nueva Compra"
            >
                <form onSubmit={handleSubmit}>
                    <InputSelect
                        id='product'
                        title='Producto'
                        data={products}
                        valueInput={formData.product}
                        handleChange={handleChange}
                    />

                    <InputLabel id='amount' title='Cantidad' typeInput='number' valueInput={formData.amount} placeholder='10' handleChange={handleChange} />

                    <InputLabel id='unitCost' title='Costo Unitario' typeInput='text' valueInput={formData.unitCost} placeholder='23.90' handleChange={handleChange} />

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
