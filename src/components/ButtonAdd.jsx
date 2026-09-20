import { CirclePlus } from 'lucide-react'

export const ButtonAdd = ({ functionOpenModal = () => { } }) => {
    return (
        <button
            type='button'
            onClick={functionOpenModal}
            className='flex justify-center items-center rounded-lg px-3 py-1.5 text-white space-x-2 bg-green-600 hover:cursor-pointer text-sm'
        >
            <span><CirclePlus /></span>
            <span>Agregar</span>
        </button>
    )
}
