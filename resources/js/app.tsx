import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'bootstrap/dist/css/bootstrap.css';
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
import Navbar from './Components/Navbar';
createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
	setup({ el, App, props }) {
		const root = createRoot(el);

		root.render(
			<>
				<Navbar />
				<div className="container">
					<App {...props} />
				</div>
			</>
		);
	},
	progress: {
		color: '#4B5563',
	},
});
