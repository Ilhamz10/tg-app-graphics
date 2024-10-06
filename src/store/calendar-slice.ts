import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICalendarSlice {
	calendarIsOpen: boolean;
	dateValue: {
		start_date: undefined | number;
		end_date: undefined | number;
	};
}

const initialState: ICalendarSlice = {
	calendarIsOpen: false,
	dateValue: {
		start_date: undefined,
		end_date: undefined,
	},
};

const calendarSlice = createSlice({
	initialState,
	name: 'calendar slice',
	reducers: {
		toggleCallendar(state) {
			state.calendarIsOpen = !state.calendarIsOpen;
		},
		setCalendar(state, action: PayloadAction<boolean>) {
			state.calendarIsOpen = action.payload;
		},
		setDateValue(
			state,
			action: PayloadAction<{
				start_date: undefined | number;
				end_date: undefined | number;
			}>
		) {
			state.dateValue = action.payload;
		},
	},
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice;
