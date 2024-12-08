import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link , useForm } from '@inertiajs/react';



export default function Index({ products }) {
    console.log(products); // Verificar los datos de los productos en la consola

    // Función para manejar la eliminación del producto
    const { delete: deleteProduct } = useForm();  // Usar useForm y desestructurar la función delete

    const handleDelete = (slug) => {
        if (confirm('Are you sure you want to delete this product?')) {
            // Redirecciona al backend para manejar la eliminación
            deleteProduct(route('products.destroy', slug));  // Usar deleteProduct directamente
        }
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Title</th>
                                        <th className="border border-gray-300 px-4 py-2">Slug</th>
                                        <th className="border border-gray-300 px-4 py-2">Description</th>
                                        <th className="border border-gray-300 px-4 py-2">Genre</th>
                                        <th className="border border-gray-300 px-4 py-2">Platform</th>
                                        <th className="border border-gray-300 px-4 py-2">Price</th>
                                        <th className="border border-gray-300 px-4 py-2">Stock</th>
                                        <th className="border border-gray-300 px-4 py-2">Image</th>
                                        <th className="border border-gray-300 px-4 py-2">Category ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id_product} className="odd:bg-white even:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{product.id_product}</td>
                                            <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                                            <td className="border border-gray-300 px-4 py-2">{product.slug}</td>
                                            <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                                            <td className="border border-gray-300 px-4 py-2">{product.genre}</td>
                                            <td className="border border-gray-300 px-4 py-2">{product.platform}</td>
                                            <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                                            <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.image ? (
                                                    <img
                                                        src={`/storage/${product.image}`}
                                                        alt={product.title}
                                                        className="w-20 h-20 object-cover"
                                                    />
                                                ) : (
                                                    'No image'
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">{product.category_slug}</td>
                                            <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                                                                                        <td className="border border-gray-300 px-4 py-2 flex flex-col space-y-2">
                                             {/* Botón de editar */}
                                             <Link
                                                    href={route('products.edit', product.slug)} // Corrección: usa el helper route() y pasa el ID correctamente
                                                    className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-center"
                                                        >
                                                         Edit
                                                        </Link>
                                                    
                                                     {/* Botón de eliminar */}
                                                <button
                                                    onClick={() => handleDelete(product.slug)}  // Se pasa correctamente el ID
                                                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-center"
                                                >
                                                    Delete
                                                </button>
                                                        </td>

                                                </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-6 flex justify-center">
                                <a
                                    href={route('products.create')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Create Product
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
