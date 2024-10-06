import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Complete from '../complete/complete';
import Bots from '../bots/bots';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { calendarActions } from '../../store/calendar-slice';
import Loading from '../loading/loading';
import { uiActions } from '../../store/ui-slice';

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

	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		new Date(),
		new Date(),
	]);
	const [startDate, endDate] = dateRange;

	useEffect(() => {
		if (startDate && endDate && location.pathname === '/choice') {
			dispatch(
				calendarActions.setDateValue({
					start_date: new Date(startDate).getTime() / 1000,
					end_date: new Date(endDate).getTime() / 1000,
				})
			);
		}
	}, [startDate, endDate, location.pathname]);

	useEffect(() => {
		if (!loading) {
			datePickerRef.current.setOpen(calendarIsOpen);
		}
	}, [calendarIsOpen, loading]);

	return (
		<>
			{loading && <Loading />}
			<main className='wrapper pb-20 pt-4'>
				<div className='flex items-center justify-between mb-8'>
					<h2 className='font-semibold text-2xl text-black mr-2'>Статистика</h2>
					<DatePicker
						ref={datePickerRef}
						selectsRange={true}
						startDate={startDate ? startDate : undefined}
						endDate={endDate ? endDate : undefined}
						onChange={(update) => {
							setDateRange(update);
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
					/>
					<p className='px-[6px] py-1 bg-[#DCDCE2] text-blue font-medium rounded-lg'>
						{startDate && endDate
							? Date.parse(startDate.toUTCString()) ===
							  Date.parse(endDate.toUTCString())
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
							onClick={() =>
								dispatch(uiActions.setActiveTab(tab.id as 'complete' | 'bots'))
							}
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
