import { baseApi } from '../api/api';
import { IDateParams, IRefs, ISortParams } from './types';

interface IRefQueryParams {
	project_id_encoded: string;
}

const referalsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getBotReferals: build.query<
			IRefs,
			ISortParams & IRefQueryParams & IDateParams
		>({
			query: ({
				order,
				sort_by,
				project_id_encoded,
				start_date,
				end_date,
				tz,
			}) => ({
				url: '/refferals/',
				params: {
					order,
					sort_by,
					project_id_encoded,
					need_to_validate: false,
					start_date,
					end_date,
					tz,
				},
			}),
		}),
	}),
});

export const { useGetBotReferalsQuery } = referalsApi;
