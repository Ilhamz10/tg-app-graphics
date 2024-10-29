import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { useCallback, useRef } from 'react';
import { calendarActions } from '../../../store/calendar-slice';

const DatePickerComponent = () => {
	const dispatch = useAppDispatch();
	const datePickerRef = useRef<any>(null);
	const { calendarState } = useAppSelector((state) => state.calendarReducer);
	const [startDate, endDate] = calendarState;

	const onUpdateDatePicker = useCallback(
		(update: [Date | null, Date | null]) => {
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
		},
		[]
	);

	return (
		<DatePicker
			ref={datePickerRef}
			selectsRange={true}
			startDate={startDate ? new Date(startDate) : undefined}
			endDate={endDate ? new Date(endDate) : undefined}
			locale={'ru'}
			onChange={onUpdateDatePicker}
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
	);
};

export default DatePickerComponent;
