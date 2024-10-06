import { baseApi } from '../api/api';
import { IBots, ISortParams } from './types';

const botsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllBots: build.query<IBots, ISortParams>({
			query: ({ order, sort_by }) => ({
				url: '/bots/',
				params: {
					order,
					sort_by,
				},
			}),
		}),
	}),
});

export const { useGetAllBotsQuery } = botsApi;
