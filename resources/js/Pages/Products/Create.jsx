import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        description: '',
        genre: '',
        platform: '',
        price: '',
        stock: '',
        image: null,
        category_slug: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => reset('title', 'slug', 'description', 'genre', 'platform', 'price', 'stock', 'image', 'category_slug'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create a new product
                </h2>
            }
        >
            <Head title="Create a new product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div className="mb-4">
                                    <InputLabel htmlFor="title" value="Product Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
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

                                <div className="mb-4">
                                    <InputLabel htmlFor="slug" value="Slug (URL)" />
                                    <TextInput
                                        id="slug"
                                        type="text"
                                        name="slug"
                                        value={data.slug}
                                        className="mt-1 block w-full"
                                        autoComplete="slug"
                                        onChange={(e) => setData('slug', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.slug} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="description" value="Product Description" />
                                    <TextInput
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        autoComplete="description"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="genre" value="Genre" />
                                    <TextInput
                                        id="genre"
                                        type="text"
                                        name="genre"
                                        value={data.genre}
                                        className="mt-1 block w-full"
                                        autoComplete="genre"
                                        onChange={(e) => setData('genre', e.target.value)}
                                    />
                                    <InputError message={errors.genre} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="platform" value="Platform" />
                                    <TextInput
                                        id="platform"
                                        type="text"
                                        name="platform"
                                        value={data.platform}
                                        className="mt-1 block w-full"
                                        autoComplete="platform"
                                        onChange={(e) => setData('platform', e.target.value)}
                                    />
                                    <InputError message={errors.platform} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        autoComplete="price"
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="stock" value="Stock" />
                                    <TextInput
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        value={data.stock}
                                        className="mt-1 block w-full"
                                        autoComplete="stock"
                                        onChange={(e) => setData('stock', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.stock} className="mt-2" />
                                </div>

                                <div className="mb-4">
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

                                <div className="mb-4">
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

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Create Product
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

