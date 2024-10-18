import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Complete from '../complete/complete';
import Bots from '../bots/bots';
import { useLocation } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { calendarActions } from '../../store/calendar-slice';
import Loading from '../loading/loading';
import { uiActions } from '../../store/ui-slice';
import { ru } from 'date-fns/locale';
import {TelegramProvider} from '../../shared/TelegramProvider';
import { getMonth, getToday, getWeek, getYear, getYesterday } from '../../utils/getDateByTimestamp';

registerLocale('ru', ru);

export let tabs = [
	{ id: 'complete', label: 'Полная' },
	{ id: 'bots', label: 'Боты' },
];

const Home = () => {


	const { activeTab } = useAppSelector((state) => state.uiReducer);
	const location = useLocation();
	const datePickerRef = useRef<any>(null);

	const { loading } = useAppSelector((state) => state.uiReducer);

	const { calendarIsOpen } = useAppSelector((state) => state.calendarReducer);
	const dispatch = useAppDispatch();

	const { calendarState } = useAppSelector((state) => state.calendarReducer);
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

	useEffect(() => {
		if (!loading) {
			datePickerRef.current.setOpen(calendarIsOpen);
		}
	}, [calendarIsOpen, loading]);

	const handleTabClick = (tabId: "complete" | "bots") => {
		if (activeTab !== tabId) {
			window.Telegram?.WebApp.HapticFeedback.selectionChanged();
			dispatch(uiActions.setActiveTab(tabId));
		}
	};

	return (
		<>
			{loading && <Loading />}
			<main
				className='wrapper pb-20 pt-4'
				style={{ opacity: loading ? '0' : '1' }}>
				<div className='flex items-center justify-between mb-8'>
					<h2 className='font-semibold text-2xl text-black mr-2'>Статистика</h2>
					<DatePicker
						ref={datePickerRef}
						selectsRange={true}
						startDate={startDate ? new Date(startDate) : undefined}
						endDate={endDate ? new Date(endDate) : undefined}
						locale={'ru'}
						onChange={(update) => {
							if (
								update[0]?.toUTCString() === update[1]?.toUTCString() &&
								update[1] !== null &&
								update[0] !== null
							) {
								update[1].setHours(23, 59, 59, 999);
							}

							dispatch(
								calendarActions.setCalendarState([
									update[0] ? update[0].toUTCString() : null,
									update[1] ? update[1].toUTCString() : null,
								])
							);
						}}
						withPortal
						placeholderText='Выберите дату'
						customInput={
							<input
								style={{
									maxWidth: `20ch`,
									width: '100%',
								}}
								className='hidden'
							/>
						}
						onClickOutside={() => dispatch(calendarActions.toggleCallendar())}
						onCalendarClose={() => dispatch(calendarActions.setCalendar(false))}
						shouldCloseOnSelect={false}
						maxDate={new Date()}
					/>
					<p className='px-[6px] py-1 bg-[#DCDCE2] text-blue font-medium rounded-lg cursor-pointer'>
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
				<div className='grid grid-cols-2 p-[2px] rounded-lg bg-[#DCDCE2] mb-5'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => handleTabClick(tab.id as 'complete' | 'bots')}
							className={`relative rounded-lg px-3 py-1.5 text-sm font-medium text-black transition`}
							style={{
								WebkitTapHighlightColor: 'transparent',
							}}>
							<span className='z-20 relative'>{tab.label}</span>
							{activeTab === tab.id && (
								<motion.span
									layoutId='bubble'
									className='absolute inset-0 z-10 bg-white rounded-[7px]'
									transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
								/>
							)}
						</button>
					))}
				</div>
				{activeTab === 'complete' ? <Complete /> : <Bots />}
			</main>
		</>
	);
};

export default Home;