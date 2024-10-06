import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/api.ts';
import calendarSlice from './calendar-slice.ts';
import uiSlice from './ui-slice.ts';

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		calendarReducer: calendarSlice.reducer,
		uiReducer: uiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
