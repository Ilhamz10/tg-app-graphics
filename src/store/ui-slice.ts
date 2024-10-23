import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUISlice {
	loading: boolean;
	activeTab: 'complete' | 'bots';
	refId: null | string;
}

const initialState: IUISlice = {
	loading: false,
	activeTab: 'complete',
	refId: null,
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
		setRefId(state, action: PayloadAction<string | null>) {
			state.refId = action.payload;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;
