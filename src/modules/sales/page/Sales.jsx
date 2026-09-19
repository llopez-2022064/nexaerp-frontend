import { useEffect, useState } from 'react'
import { CirclePlus, RefreshCw } from 'lucide-react'
import { gooeyToast } from 'goey-toast'
import { Table } from '../../../components/Table'
import { InputLabel } from '../../../components/InputLabel'
import { InputSelect } from '../../../components/InputSelect'
import { useGet } from '../../../hooks/useGet'
import { useAuthStore } from '../../auth/store/useAuthStore'
import { hasPermission, PERMISSIONS } from '../../../config/permissions'
import { createSaleRequest } from '../service/sales'
import { Modal } from '../../../components/Modal'
import { TitleSection } from '../../../components/TitleSection'

export const Sales = () => {
    const { getElements: getSales, data: sales } = useGet('/api/v1/sales')
    const { getElements: getProducts, data: products } = useGet('/api/v1/products')

    const user = useAuthStore((state) => state.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        product: '',
        amount: ''
    })

    const canCreateSale = hasPermission(
        user?.role,
        PERMISSIONS.CREATE_SALES
    )

    const openCreate = () => {
        setFormData({
            product: '',
            amount: ''
        })

        setIsModalOpen(true)
    }

    const handleChange = (event) => {
        setFormData((previousData) => ({
            ...previousData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const amount = Number(formData.amount)

        if (!formData.product || amount <= 0) {
            gooeyToast.error('Completa el producto y una cantidad válida')
            return
        }

        try {
            await createSaleRequest({
                product: formData.product,
                amount
            })

            await getSales()
            setIsModalOpen(false)

            gooeyToast.success('Venta registrada con éxito')
        } catch (requestError) {
            gooeyToast.error('No fue posible registrar la venta')
        }
    }

    const columns = [
        {
            header: 'No.',
            cell: (item, rowIndex) => rowIndex + 1
        },
        {
            header: 'Producto',
            cell: (item) => item.product?.name
        },
        {
            header: 'Precio del Producto',
            cell: (item) => item.product?.sellingPrice
        },
        {
            header: 'Cantidad',
            cell: (item) => item.amount
        },
        {
            header: 'Total',
            cell: (item) => item.total
        },
        {
            header: 'Fecha',
            cell: (item) => item.date
        }
    ]

    useEffect(() => {
        getSales()
        getProducts()
    }, [getSales, getProducts])

    return (
        <div>
            <div className="flex justify-between bg-white rounded-lg px-4 py-2 mb-2">
                <TitleSection partOne='Ven' partTwo='tas' />

                <div className="flex justify-center items-center space-x-5">
                    {canCreateSale && (
                        <button
                            type="button"
                            onClick={openCreate}
                            className="text-green-500 cursor-pointer"
                        >
                            <CirclePlus />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={getSales}
                        className="text-sky-400 cursor-pointer"
                    >
                        <RefreshCw className="hover:animate-spin" />
                    </button>
                </div>
            </div>

            <Table columns={columns} data={sales} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nueva Venta"
            >
                <form onSubmit={handleSubmit}>
                    <InputSelect
                        id="product"
                        title="Producto"
                        data={products}
                        valueInput={formData.product}
                        handleChange={handleChange}
                    />

                    <InputLabel
                        id="amount"
                        title="Cantidad"
                        typeInput="number"
                        valueInput={formData.amount}
                        placeholder="1"
                        handleChange={handleChange}
                    />

                    <div className="flex gap-2 mt-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-red-400 text-white py-2 rounded-lg cursor-pointer"
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