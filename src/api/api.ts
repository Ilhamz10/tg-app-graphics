import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../config/config';

export const api_url = config.backend_url;
const authHeader =
	window.Telegram?.WebApp.initData ||
	'query_id=AAGgHLYYAAAAAKActhiJRp9a&user=%7B%22id%22%3A414588064%2C%22first_name%22%3A%22KITO%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22lKITOl%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1724458627&hash=a4afa3dd053b9f8a7412f2fb122cf65f89b374265eac806ba168470c1cd4a72f'; // сюда подставить свой тг хэш

const baseQuery = fetchBaseQuery({
	baseUrl: api_url,
	prepareHeaders: (headers, { endpoint }) => {
		if (authHeader) {
			headers.set('auth', `${authHeader}`);
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
