import { useEffect } from 'react';
import { Table } from '../../../components/Table'
import { useGet } from '../../../hooks/useGet'
import { RefreshCw } from 'lucide-react';
import { TitleSection } from '../../../components/TitleSection';

export const InventoryHistory = () => {
    const { getElements, data, error, isLoading } = useGet('/api/v1/inventory/history');

    useEffect(() => {
        getElements()
    }, [getElements])

    const columns = [
        {
            header: 'No.',
            cell: (item, rowIndex) => rowIndex + 1
        },
        {
            header: 'Movimiento',
            cell: (item) => item.movement
        },
        {
            header: 'Cantidad',
            cell: (item) => item.amount
        },
        {
            header: 'Fecha',
            cell: (item) => item.date
        },
    ]

    return (
        <div>
            <div className='flex justify-between bg-white rounded-lg px-4 py-2 mb-2'>
                <TitleSection partOne='Historial de Inventa' partTwo='rio' />
                
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
