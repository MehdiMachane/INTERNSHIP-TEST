import '../index.css';

const List = ({ columns, data, buttons }) => {
    return (
        <div className="bg-gray-100 rounded-md">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-black">
                    <thead className=" bg-gray-500 rounded-lg border-black">
                        <tr >
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-3 text-left text-sm font-basic text-white uppercase tracking-wider border-black"
                                >
                                    {column.name}
                                </th>
                            ))}
                            <th className="px-6 py-3 mr-4 text-sm font-basic text-white uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-200">
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-6 py-6  text-sm text-gray-900"
                                    >
                                        {project[column.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4  text-right text-sm font-medium">
                                    <div className="space-x-3">
                                        {buttons.map((button) => (
                                            <button
                                                key={button.label}
                                                onClick={() => button.action(project.id)}
                                                className={`rounded-md px-2 py-1 text-sm font-medium text-white ${button.style}`}
                                            >
                                                {button.label}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default List 