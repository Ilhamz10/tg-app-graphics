import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/home/Home';
import { Root } from './layout/root/root';
import 'react-datepicker/dist/react-datepicker.css';

import { store } from './store';
import Webapp from './pages/webapp/webapp';

export const routes = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/choice',
		element: <Home />,
	},
	{
		path: '/week',
		element: <Home />,
	},
	{
		path: '/year',
		element: <Home />,
	},
	{
		path: '/month',
		element: <Home />,
	},
	{
		path: '/yesterday',
		element: <Home />,
	},
	{ path: '/webapp', element: <Webapp /> },
];

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: routes,
	},
]);

declare global {
	interface Window {
		Telegram: any;
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
