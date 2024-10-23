import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { uiActions } from '../store/ui-slice';

const useBackButton = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { refId } = useAppSelector((state) => state.uiReducer);

	const handleBackButton = useCallback(
		() => dispatch(uiActions.setRefId(null)),
		[navigate]
	);

	useEffect(() => {
		const tg = window.Telegram.WebApp;

		if (!tg.BackButton) {
			return;
		}

		if (refId) {
			tg.BackButton.show();
			tg.BackButton.onClick(handleBackButton);
		} else {
			tg.BackButton.hide();
		}

		return () => {
			tg.BackButton.offClick(handleBackButton);
		};
	}, [location.pathname, navigate, refId]);
};

export default useBackButton;
