import React from 'react'

export const Table = ({ columns = [], data = [] }) => {
    return (
        <table class="min-w-full divide-y divide-gray-200 overflow-x-auto">
            <thead class="bg-gray-50">
                <tr>
                    {columns.map((column) => (
                        <th key={column.header} scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>

            {data.length > 0 ? (
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, rowIndex) => (
                        <tr key={item._id}>
                            {columns.map((column) => (
                                <td
                                    key={column.header}
                                    className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs wrap-break-word"
                                >
                                    {column.cell(item, rowIndex)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            ) : (
                <tbody className='w-full p-5 text-center text-gray-300'>
                    <tr>
                        <td
                            colSpan={columns.length}
                            className="p-5 text-center text-gray-400"
                        >
                            No existen registros
                        </td>
                    </tr>
                </tbody>
            )}
        </table>
    )
}
