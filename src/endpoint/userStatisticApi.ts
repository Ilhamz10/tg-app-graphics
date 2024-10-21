import { baseApi } from '../api/api';
import { IDateParams, IStatisticGraphic, IUserStatistic } from './types';

const userStatisticApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getStatisticRaw: build.query<IUserStatistic, IDateParams>({
			query: ({ start_date, end_date, tz }) => ({
				url: '/statistic/raw',
				params: {
					start_date,
					end_date,
					tz,
				},
			}),
		}),
		getClientsStatistic: build.query<IStatisticGraphic, IDateParams>({
			query: ({ end_date, start_date, tz }) => ({
				url: '/statistic/clients',
				params: {
					start_date,
					end_date,
					tz,
				},
			}),
		}),
		getIncomeStatistic: build.query<IStatisticGraphic, IDateParams>({
			query: ({ end_date, start_date, tz }) => ({
				url: '/statistic/clients', //Здесь поменять на нужный эндпоинт
				params: {
					start_date,
					end_date,
					tz,
				},
			}),
		}),
		getPaymentsCountStatistic: build.query<IStatisticGraphic, IDateParams>({
			query: ({ end_date, start_date, tz }) => ({
				url: '/statistic/icnome', //Здесь поменять на нужный эндпоинт
				params: {
					start_date,
					end_date,
					tz,
				},
			}),
		}),
	}),
});

export const {
	useGetStatisticRawQuery,
	useLazyGetClientsStatisticQuery,
	useGetClientsStatisticQuery,
	useLazyGetIncomeStatisticQuery,
	useLazyGetPaymentsCountStatisticQuery,
	useLazyGetStatisticRawQuery,
	useGetIncomeStatisticQuery,
	useGetPaymentsCountStatisticQuery,
} = userStatisticApi;
