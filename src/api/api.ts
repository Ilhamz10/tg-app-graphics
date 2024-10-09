import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../config/config';

export const api_url = config.backend_url;
const authHeader =
	window.Telegram?.WebApp.initData

const baseQuery = fetchBaseQuery({
	baseUrl: api_url,
	prepareHeaders: (headers, { endpoint }) => {
		if (authHeader) {
			headers.set('X-InitData', `${authHeader}`);
		}
		return headers;
	},
});

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: baseQuery,
	tagTypes: [],
	endpoints: () => ({}),
});
