import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const useBackButton = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const handleBackButton = useCallback(() => navigate('/'), [navigate]);

	useEffect(() => {
		const tg = window.Telegram.WebApp;

		if (!tg.BackButton) {
			return;
		}

		if (searchParams.get('project_id')) {
			tg.BackButton.show();
			tg.BackButton.onClick(handleBackButton);
		} else {
			tg.BackButton.hide();
		}

		return () => {
			tg.BackButton.offClick(handleBackButton);
		};
	}, [location.pathname, navigate]);
};

export default useBackButton;
