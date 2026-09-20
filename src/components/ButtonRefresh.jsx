import { RefreshCw } from 'lucide-react'

export const ButtonRefresh = ({ functionRefresh = () => { } }) => {
    return (
        <button
            type='button'
            onClick={functionRefresh}
            className='flex justify-center items-center rounded-lg px-3 py-1.5 text-white space-x-2 bg-sky-500 hover:cursor-pointer text-sm'
        >
            <span><RefreshCw /></span>
            <span>Actualizar</span>
        </button>
    )
}
