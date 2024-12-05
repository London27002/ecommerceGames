import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
   const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        priority: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('categories.store'), {
            onFinish: () => reset('name', 'description', 'priority'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create a new Category
                </h2>
            }
        >
            <Head title=" Create a new project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        
                        <form  onSubmit={submit}>
                        <div>

                    <InputLabel htmlFor="name" value=" Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required

                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                        <div>

                    <InputLabel htmlFor="description" value=" Description" />

                    <TextInput
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        autoComplete="description"
                        isFocused={true}
                        onChange={(e) => setData('description', e.target.value)}
                        
                    />

                    <InputError message={errors.description} className="mt-2" />
                    </div>
                     <div>

                    <InputLabel htmlFor="priority" value="Priority" />

                    <TextInput
                        id="priority"
                        name="priority"
                        value={data.priority}
                        className="mt-1 block w-full"
                        autoComplete="priority"
                        isFocused={true}
                        onChange={(e) => setData('priority', e.target.value)}
                        
                    />

                    <InputError message={errors.priority} className="mt-2" />
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create Category
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
