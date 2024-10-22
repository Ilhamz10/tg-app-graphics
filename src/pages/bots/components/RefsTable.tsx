import React, { useEffect, useState } from 'react';
import Tbody from '../UI/tbody';
import Thead from '../UI/thead';
import { uiActions } from '../../../store/ui-slice';
import { useGetBotReferalsQuery } from '../../../endpoint/referalsApi';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { ISortParams } from '../../../endpoint/types';
import { useSearchParams } from 'react-router-dom';

const RefsTable = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const { dateValue } = useAppSelector((state) => state.calendarReducer);
	const [sortParams, setSortParams] = useState<ISortParams>({
		order: 'asc',
		sort_by: 'users_count',
	});

	const { data, isFetching, isSuccess, refetch } = useGetBotReferalsQuery(
		{
			order: sortParams.order,
			sort_by: sortParams.sort_by,
			project_id_encoded: searchParams.get('project_id') as string,
			// start_date: dateValue.start_date as number,
			// end_date: dateValue.end_date as number,
			// tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		{
			skip:
				dateValue.end_date === undefined || dateValue.start_date === undefined,
		}
	);

	useEffect(() => {
		if (isFetching) {
			dispatch(uiActions.setLoading(true));
		}

		if (isSuccess && !isFetching) {
			dispatch(uiActions.setLoading(false));
		}
	}, [isFetching, isSuccess]);

	useEffect(() => {
		refetch();
	}, [sortParams]);

	return (
		<div className='w-full grid grid-cols-[8ch,repeat(5,auto)] text-center overflow-auto'>
			<Thead setSortParams={setSortParams} />
			{isSuccess &&
				data.result &&
				data.result.projects.map((refLink) => (
					<Tbody
						tbody={{
							bots: refLink.name,
							ca: '', //project.conversion,
							payments: '', //project.payments_count,
							pdp: '', //project.per_client_price,
							profit: '', //project.income_total,
							users: '', //project.users_count,
						}}
					/>
				))}
		</div>
	);
};

export default RefsTable;