import { X } from 'lucide-react'

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-6 w-xl max-w-xl shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
