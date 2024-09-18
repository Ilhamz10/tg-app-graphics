import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICalendarSlice {
	calendarIsOpen: boolean;
}

const initialState: ICalendarSlice = {
	calendarIsOpen: false,
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
	},
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice;
