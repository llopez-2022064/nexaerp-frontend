import { useEffect } from 'react';
import { Table } from '../../../components/Table'
import { useGet } from '../../../hooks/useGet'
import { RefreshCw } from 'lucide-react';
import { TitleSection } from '../../../components/TitleSection';
import { formatDate } from '../../../utils/formatearFechas';
import { ButtonRefresh } from '../../../components/ButtonRefresh';

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
            cell: (item) => formatDate(item.date)
        },
    ]

    const refreshMovements = () => {
        getElements()
    }

    return (
        <div>
            <div className='flex justify-between items-center bg-white rounded-lg px-5 py-2.5 mb-2'>
                <TitleSection partOne='Historial de Movimien' partTwo='tos' />

                <div className='flex justify-center items-center space-x-5'>
                    <ButtonRefresh functionRefresh={getElements} />
                </div>
            </div>
            <Table columns={columns} data={data} />
        </div>
    )
}
