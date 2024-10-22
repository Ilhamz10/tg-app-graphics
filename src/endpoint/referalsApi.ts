import { baseApi } from '../api/api';
import { IRefs, ISortParams } from './types';

interface IRefQueryParams {
	project_id_encoded: string;
}

const referalsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getBotReferals: build.query<IRefs, ISortParams & IRefQueryParams>({
			query: ({
				order,
				sort_by,
				project_id_encoded,
				// start_date,
				// end_date,
				// tz
			}) => ({
				url: '/refferals/',
				params: {
					order,
					sort_by,
					project_id_encoded,
					// start_date,
					// end_date,
					// tz,
				},
			}),
		}),
	}),
});

export const { useGetBotReferalsQuery } = referalsApi;
