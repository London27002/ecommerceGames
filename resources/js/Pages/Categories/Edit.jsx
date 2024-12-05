import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ category }) {
    // Inicializar los datos del formulario con los valores de la categoría
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
        priority: category.priority || '',
    });

    const submit = (e) => {
        e.preventDefault();

        // Enviar los datos al backend
        put(route('categories.update', category.id_categorie), {
            preserveScroll: true, // Evitar el desplazamiento de la página después de enviar
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Category</h2>}
        >
            <Head title="Edit Category" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                {/* Nombre de la categoría */}
                                <div>
                                    <InputLabel htmlFor="name" value="Category Name" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Descripción de la categoría */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextInput
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Prioridad de la categoría */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="priority" value="Priority" />
                                    <TextInput
                                        id="priority"
                                        type="number"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.priority} className="mt-2" />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Update Category
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
