import React, { useEffect } from 'react';
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { TelegramProvider } from './TelegramProvider.ts';
import './animatedRoutes.css';
import AnimatedRoutes from './AnimatedRoutes.tsx';
import useBackButton from '../hooks/useBackButton.ts';

function Layout({ routes }: { routes: any }) {
	const location = useLocation();
	// const data = useAppSelector(selectStaticData)
	useBackButton()
	const navigate = useNavigate();
	const setThemeBasedOnTimeAndPreference = () => {
		const currentHour = new Date().getHours();
		// Set time if needed
		const isNightTime = currentHour >= 22 || currentHour < 5;
		const isTelegramDarkTheme = window.Telegram.WebApp.colorScheme === 'dark';

		if (isTelegramDarkTheme || isNightTime) {
			document.documentElement.classList.add('dark');
			TelegramProvider.setColor('#2D2F30');
		} else {
			document.documentElement.classList.remove('dark');
			TelegramProvider.setColor('#FDFAFA');
		}
	};

	useEffect(() => {
		TelegramProvider.initializeApp();
		// To navigate to loader if some data is missing
		// if (!data.id) {
		//     navigate('/')
		// }
		setThemeBasedOnTimeAndPreference();
	}, []);

	return (
		<div className={`h-screen flex flex-col dark:bg-d-bg`}>
			<div className='flex-1 overflow-y-scroll relative content-wrapper'>
				<AnimatedRoutes routes={routes} />
			</div>
			{/*TO DELETE TAB BAR ON SOME ROUTES*/}
			{/*{location.pathname !== '/sign-up' && location.pathname !== '/' &&*/}
			{/*    location.pathname !== '/tutorial' && <TabBar />}*/}
		</div>
	);
}

export default Layout;
