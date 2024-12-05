import { Link } from '@inertiajs/react';

export default function ProductShow({ product, auth }) {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-[#FF2D20] text-white">
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

                {/* Navigation */}
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

            {/* Product Details */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0">
                                {/* Product Image */}
                                <div className="flex-shrink-0 w-full md:w-96">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.title}
                                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="mt-6 md:mt-0 md:ml-8 flex-grow">
                                    <h3 className="text-3xl font-bold mb-4 text-[#FF2D20]">{product.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>

                                    {/* Genre */}
                                    <div className="mb-4">
                                        <span className="font-semibold text-[#FF2D20]">Genre:</span> {product.genre}
                                    </div>

                                    {/* Platform */}
                                    <div className="mb-4">
                                        <span className="font-semibold text-[#FF2D20]">Platform:</span> {product.platform}
                                    </div>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <span className="font-semibold text-[#FF2D20]">Price:</span> ${product.price}
                                    </div>

                                    {/* Stock */}
                                    <div className="mb-4">
                                        <span className="font-semibold text-[#FF2D20]">Stock:</span> {product.stock}
                                    </div>

                                    {/* Category */}
                                    <div className="mb-4">
                                        <span className="font-semibold text-[#FF2D20]">Category:</span> {product.category.name}
                                    </div>

                                    {/* Back to Home Button */}
                                    <Link
                                        href={route('home')}
                                        className="inline-block px-6 py-2 mt-6 bg-[#FF2D20] text-white font-semibold rounded-lg hover:bg-[#e65b5b] transition"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
