import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Home({ auth, categories, products }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Función para manejar la selección de categoría
    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // Establecer la categoría seleccionada
    };

    // Función para mostrar todos los productos
    const showAllProducts = () => {
        setSelectedCategory(null); // Restablecer el filtro de categoría
    };

    // Filtrar productos por la categoría seleccionada
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category_slug === selectedCategory.slug)
        : products;

    return (
        <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="relative flex min-h-screen flex-col items-center justify-start selection:bg-[#FF2D20] selection:text-white">
                <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                    <div className="container mx-auto">
                        <header className="flex items-center justify-between px-6 py-4 bg-[#FF2D20] text-white shadow-lg">
                            {/* Logo y Ecommerce Games - Ahora es un Link */}
                            <div className="flex items-center">
                                <Link href={route('home')} className="flex items-center">
                                    <svg
                                        className="h-12 w-auto text-white"
                                        viewBox="0 0 62 65"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        {/* SVG Path para tu logo */}
                                    </svg>
                                    <h1 className="text-xl font-bold ml-3">Ecommerce Games</h1>
                                </Link>
                            </div>

                            {/* Navegación */}
                            <nav className="flex items-center space-x-6">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('profile.edit')}
                                            className="px-4 py-2 text-white rounded-md hover:bg-white hover:text-[#FF2D20] transition"
                                        >
                                            Mi Cuenta
                                        </Link>
                                        <Link
                                            href={route('dashboard')}
                                            className="px-4 py-2 text-white rounded-md hover:bg-white hover:text-[#FF2D20] transition"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-white rounded-md hover:bg-white hover:text-[#FF2D20] transition"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-4 py-2 text-white rounded-md hover:bg-white hover:text-[#FF2D20] transition"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        {/* Categories */}
                        <div className="mb-8 mt-8"> {/* Aquí añadimos el margen superior mt-8 */}
                            <div className="flex space-x-4 mt-4">
                                {/* All Products button */}
                                <button
                                    onClick={showAllProducts}
                                    className={`px-6 py-3 text-white rounded-lg transition ${!selectedCategory ? 'bg-[#FF2D20]' : 'bg-[#FF6F61] hover:bg-[#FF2D20]'}`}
                                >
                                    All Products
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.slug}
                                        onClick={() => handleCategorySelect(category)}
                                        className={`px-6 py-3 text-white rounded-lg transition ${selectedCategory?.id_categorie === category.id_categorie ? 'bg-[#FF2D20]' : 'bg-[#FF6F61] hover:bg-[#FF2D20]'}`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Products */}
                        <h2 className="text-2xl font-semibold mb-4">
                            {selectedCategory ? `Products in ${selectedCategory.name}` : 'Featured Products'}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id_product} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4 bg-white">
                                        <h3 className="text-xl font-bold">{product.title}</h3>
                                        <p className="text-gray-600">{product.description}</p>
                                        <p className="text-[#FF2D20] font-semibold">${product.price}</p>
                                        <Link
                                            href={route('products.show', product.slug)}
                                            className="mt-4 inline-block px-4 py-2 bg-[#FF2D20] text-white rounded-lg hover:bg-[#e65b5b] transition"
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
