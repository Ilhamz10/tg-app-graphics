import { motion } from 'framer-motion';
import { lazy, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { registerLocale } from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { calendarActions } from '../../store/calendar-slice';
import { uiActions } from '../../store/ui-slice';
import { ru } from 'date-fns/locale';
import {
	getMonth,
	getToday,
	getWeek,
	getYear,
	getYesterday,
} from '../../utils/getDateByTimestamp';
import SeparateRefsTable from '../bots/components/SeparateRefsTable';
import Complete from '../complete/complete';
import Bots from '../bots/bots';
const LazyDatePickerComponent = lazy(
	() => import('./components/DatePickerComponent')
);

registerLocale('ru', ru);

export let tabs = [
	{ id: 'complete', label: 'Полная' },
	{ id: 'bots', label: 'Боты' },
];

const Home = () => {
	const [searchParams] = useSearchParams();
	const { activeTab, refId } = useAppSelector(
		(state) => state.uiReducer
	);
	const { calendarState } = useAppSelector((state) => state.calendarReducer);
	const location = useLocation();
	const dispatch = useAppDispatch();

	const [startDate, endDate] = calendarState;

	useEffect(() => {
		if (startDate && endDate) {
			dispatch(
				calendarActions.setDateValue({
					start_date: new Date(startDate).getTime() / 1000,
					end_date: new Date(endDate).getTime() / 1000,
				})
			);
		}
	}, [startDate, endDate]);

	useEffect(() => {
		switch (location.pathname) {
			case '/':
			case '/choice':
				const { start, end } = getToday();
				dispatch(
					calendarActions.setCalendarState([
						new Date(start * 1000).toUTCString(),
						new Date(end * 1000).toUTCString(),
					])
				);
				break;
			case '/yesterday':
				const { startOfYesterday, endOfYesterday } = getYesterday();
				dispatch(
					calendarActions.setCalendarState([
						new Date(startOfYesterday * 1000).toUTCString(),
						new Date(endOfYesterday * 1000).toUTCString(),
					])
				);
				break;
			case '/week':
				const { start: startWeek, end: endWeek } = getWeek();
				dispatch(
					calendarActions.setCalendarState([
						new Date(startWeek * 1000).toUTCString(),
						new Date(endWeek * 1000).toUTCString(),
					])
				);
				break;
			case '/month':
				const { startMonth, endMonth } = getMonth();
				dispatch(
					calendarActions.setCalendarState([
						new Date(startMonth * 1000).toUTCString(),
						new Date(endMonth * 1000).toUTCString(),
					])
				);
				break;
			case '/year':
				const { startYear, endYear } = getYear();
				dispatch(
					calendarActions.setCalendarState([
						new Date(startYear * 1000).toUTCString(),
						new Date(endYear * 1000).toUTCString(),
					])
				);
				break;
		}
	}, [location.pathname]);

	const handleTabClick = (tabId: 'complete' | 'bots') => {
		if (activeTab !== tabId) {
			window.Telegram?.WebApp.HapticFeedback.selectionChanged();
			dispatch(uiActions.setActiveTab(tabId));
		}
	};

	return (
		<>
			{/* {loading && !searchParams.get('project_id') && <Loading />} */}
			<main
				className='wrapper pb-20 pt-4'
				// style={{
				// 	opacity: loading ? '0' : '1',
				// }}
			>
				<div className='flex items-center justify-between mb-8'>
					<h2 className='font-semibold text-2xl text-textColor mr-2'>
						Статистика
					</h2>
					<LazyDatePickerComponent />
					<p className='px-[6px] py-1 bg-bgColor text-linkColor font-medium rounded-lg cursor-pointer'>
						{startDate && endDate
							? new Date(startDate).getFullYear() ===
									new Date(endDate).getFullYear() &&
							  new Date(startDate).getMonth() ===
									new Date(endDate).getMonth() &&
							  new Date(startDate).getDate() === new Date(endDate).getDate()
								? `${new Date(startDate).toLocaleDateString('ru-Ru', {
										day: '2-digit',
										month: 'short',
								  })}`
								: `${new Date(startDate).toLocaleDateString('ru-Ru', {
										day: '2-digit',
										month: 'short',
								  })} - ${new Date(endDate).toLocaleDateString('ru-Ru', {
										day: '2-digit',
										month: 'short',
								  })}`
							: 'Выберите дату'}
					</p>
				</div>
				{!refId && !searchParams.get('project_id') && (
					<div className='grid grid-cols-2 p-[2px] rounded-lg bg-[#7878801F] mb-5'>
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => handleTabClick(tab.id as 'complete' | 'bots')}
								className={`relative rounded-lg px-3 py-1.5 text-sm font-medium text-textColor transition`}
								style={{
									WebkitTapHighlightColor: 'transparent',
								}}>
								<span className='z-20 relative'>{tab.label}</span>
								{activeTab === tab.id && (
									<motion.span
										layoutId='bubble'
										className='absolute inset-0 z-10 bg-bgColor rounded-[7px]'
										transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
									/>
								)}
							</button>
						))}
					</div>
				)}
				{!searchParams.get('project_id') &&
					(activeTab === 'complete' ? <Complete /> : <Bots />)}
				{searchParams.get('project_id') && <SeparateRefsTable />}
			</main>
		</>
	);
};

export default Home;
