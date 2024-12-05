import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ categories }) {
    console.log(categories); // Verificar los datos de los productos en la consola

    // Función para manejar la eliminación de la categoría
    const { delete: deleteCategorie } = useForm();  // Usar useForm y desestructurar la función delete

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            // Redirecciona al backend para manejar la eliminación
            deleteCategorie(route('categories.destroy', id));  // Usar deleteCategorie directamente
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Description</th>
                                        <th className="border border-gray-300 px-4 py-2">Priority</th>
                                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id_categorie} className="odd:bg-white even:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{category.id_categorie}</td>
                                            <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{category.description}</td>
                                            <td className="border border-gray-300 px-4 py-2">{category.priority}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex flex-col space-y-2">
                                                    {/* Botón de Editar */}
                                                    <Link
                                                        href={route('categories.edit', category.id_categorie)}
                                                        className="block w-full px-4 py-2 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                    >
                                                        Edit
                                                    </Link>
                                                    
                                                    {/* Botón de Eliminar */}
                                                    <button
                                                        onClick={() => handleDelete(category.id_categorie)}
                                                        className="block w-full px-4 py-2 text-center bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-6 flex justify-center">
                                <a
                                    href={route('categories.create')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Create Category
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
