import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../config/config';

export const api_url = config.backend_url;
const authHeader =
	window.Telegram?.WebApp.initData ||
	'query_id=AAG1CzFZAgAAALULMVk2tyEI&user=%7B%22id%22%3A5791353781%2C%22first_name%22%3A%22cazqev%20%5B%F0%9F%90%8D%5D%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22qcazqev%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728132071&hash=d52dc5d54a1b5bc18ac638110fb2b76951810e2adb306bcb8aa556c01f0bbd7e'; // сюда подставить свой тг хэш

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
