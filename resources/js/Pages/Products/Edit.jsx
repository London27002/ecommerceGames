import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: product.title || '',
        slug: product.slug || '',
        description: product.description || '',
        genre: product.genre || '',
        platform: product.platform || '',
        price: product.price || '',
        stock: product.stock || '',
        image: null,
        category_slug: product.category_slug || '',
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let key in data) {
            if (key === 'image' && data[key] === null) continue;
            formData.append(key, data[key]);
        }

        // Usar el slug del producto para la ruta de actualización
        post(route('products.update', product.slug), formData);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Product</h2>}
        >
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div>
                                    <InputLabel htmlFor="title" value="Product Title" />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="slug" value="Slug (URL)" />
                                    <TextInput
                                        id="slug"
                                        name="slug"
                                        value={data.slug}
                                        className="mt-1 block w-full"
                                        autoComplete="slug"
                                        onChange={(e) => setData('slug', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.slug} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Product Description" />
                                    <TextInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        autoComplete="description"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="genre" value="Genre" />
                                    <TextInput
                                        id="genre"
                                        name="genre"
                                        value={data.genre}
                                        className="mt-1 block w-full"
                                        autoComplete="genre"
                                        onChange={(e) => setData('genre', e.target.value)}
                                    />
                                    <InputError message={errors.genre} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="platform" value="Platform" />
                                    <TextInput
                                        id="platform"
                                        name="platform"
                                        value={data.platform}
                                        className="mt-1 block w-full"
                                        autoComplete="platform"
                                        onChange={(e) => setData('platform', e.target.value)}
                                    />
                                    <InputError message={errors.platform} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        autoComplete="price"
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="stock" value="Stock" />
                                    <TextInput
                                        id="stock"
                                        name="stock"
                                        value={data.stock}
                                        className="mt-1 block w-full"
                                        autoComplete="stock"
                                        onChange={(e) => setData('stock', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.stock} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Product Image" />
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="category_slug" value="Category" />
                                    <Select
                                        id="category_slug"
                                        name="category_slug"
                                        value={data.category_slug}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('category_slug', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.slug} value={category.slug}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <InputError message={errors.category_slug} className="mt-2" />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Update Product
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

