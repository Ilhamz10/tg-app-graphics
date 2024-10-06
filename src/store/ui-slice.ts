import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUISlice {
	loading: boolean;
	activeTab: 'complete' | 'bots';
}

const initialState: IUISlice = {
	loading: false,
	activeTab: 'complete',
};

const uiSlice = createSlice({
	initialState,
	name: 'UI slice',
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		setActiveTab(state, action: PayloadAction<'complete' | 'bots'>) {
			state.activeTab = action.payload;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;
