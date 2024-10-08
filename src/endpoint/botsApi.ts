import { baseApi } from '../api/api';
import { IBots, IDateParams, ISortParams } from './types';

const botsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllBots: build.query<IBots, ISortParams & IDateParams>({
			query: ({ order, sort_by, start_date, end_date, tz }) => ({
				url: '/bots/',
				params: {
					order,
					sort_by,
					start_date,
					end_date,
					tz,
				},
			}),
		}),
	}),
});

export const { useGetAllBotsQuery } = botsApi;
