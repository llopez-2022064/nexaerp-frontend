export const InputSelect = ({
    id = '',
    title = '',
    data = [],
    valueInput = '',
    handleChange = () => { }
}) => {
    return (
        <div className="flex flex-col space-y-1.5 mt-1.5">
            <label
                htmlFor={id}
                className="text-sm font-medium text-gray-700"
            >
                {title}
            </label>

            <select
                id={id}
                name={id}
                value={valueInput}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black focus:ring-1 focus:ring-black"
            >
                <option value="">Selecciona una opción</option>

                {data.map((item) => (
                    <option key={item._id} value={item._id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
