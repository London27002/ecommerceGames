import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

// Personaliza el nombre de la aplicación aquí
const appName = 'Ecommerce Games';  // Ahora el nombre está fijo como Ecommerce Games

createInertiaApp({
    title: (title) => `${title} ${appName}`,  // Usará Ecommerce Games como sufijo del título
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
