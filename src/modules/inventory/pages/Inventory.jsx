import { RefreshCw } from 'lucide-react'
import { Table } from '../../../components/Table'
import { useGet } from '../../../hooks/useGet'
import { useEffect } from 'react'
import { TitleSection } from '../../../components/TitleSection'

export const Inventory = () => {
    const { error, getElements, data, isLoading } = useGet('/api/v1/inventory')

    useEffect(() => {
        getElements()
    }, [getElements])

    const columns = [
        {
            header: 'No.',
            cell: (item, rowIndex) => rowIndex + 1
        },
        {
            header: 'Producto',
            cell: (item) => item.product.name
        },
        {
            header: 'Cantidad',
            cell: (item) => (
                <span className={item.amount === 0 ? 'text-red-500' : 'text-green-500'}>
                    {item.amount}
                </span>
            )
        }
    ]

    return (
        <div>
            <div className='flex justify-between bg-white rounded-lg px-4 py-2 mb-2'>
                <TitleSection partOne='Inventa' partTwo='rio' />

                <div className='flex justify-center items-center space-x-5'>
                    <button className='text-sky-400 cursor-pointer'>
                        <RefreshCw className='hover:animate-spin' />
                    </button>
                </div>
            </div>
            <Table columns={columns} data={data} />
        </div>
    )
}
