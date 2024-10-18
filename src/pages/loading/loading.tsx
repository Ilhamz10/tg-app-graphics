import React, { useEffect, useRef, useState } from 'react';
import { tabs } from '../home/Home';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import DatePicker, { registerLocale } from 'react-datepicker';
import { calendarActions } from '../../store/calendar-slice';
import { motion } from 'framer-motion';
import CompleteLoading from './components/complete-loading';
import BotsLoading from './components/bots-loading';
import { uiActions } from '../../store/ui-slice';
import { ru } from 'date-fns/locale';

registerLocale('ru', ru);

const Loading = () => {
	// const [activeTab, setActiveTab] = useState(tabs[0].id);
	const { activeTab } = useAppSelector((state) => state.uiReducer);
	const datePickerRef = useRef<any>(null);

	const { calendarIsOpen } = useAppSelector((state) => state.calendarReducer);
	const dispatch = useAppDispatch();

	const { calendarState } = useAppSelector((state) => state.calendarReducer);
	const [startDate, endDate] = calendarState;

	useEffect(() => {
		datePickerRef.current.setOpen(calendarIsOpen);
	}, [calendarIsOpen]);

	return (
		<main className='wrapper pb-20 pt-4 absolute inset-0 bg-[#ebebf0] z-50'>
			<header className='flex items-center justify-between mb-8'>
				<h2 className='font-semibold text-2xl text-black mr-2'>Статистика</h2>
				<DatePicker
					ref={datePickerRef}
					selectsRange={true}
					startDate={startDate ? new Date(startDate) : undefined}
					endDate={endDate ? new Date(endDate) : undefined}
					onChange={(update) => {
						dispatch(
							calendarActions.setCalendarState([
								update[0] ? update[0].toUTCString() : null,
								update[1] ? update[1].toUTCString() : null,
							])
						);
					}}
					locale={'ru'}
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
				<p className='px-[6px] py-1 bg-[#DCDCE2] text-blue font-medium rounded-lg'>
					{startDate && endDate
						? new Date(startDate).getFullYear() ===
								new Date(endDate).getFullYear() &&
						  new Date(startDate).getMonth() === new Date(endDate).getMonth() &&
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
			</header>
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
			{activeTab === 'complete' ? <CompleteLoading /> : <BotsLoading />}
		</main>
	);
};

export default Loading;
