import React, { useEffect, useState } from 'react';
import Thead from '../UI/thead';
import Tbody from '../UI/tbody';
import { uiActions } from '../../../store/ui-slice';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { useGetBotReferalsQuery } from '../../../endpoint/referalsApi';
import { ISortParams } from '../../../endpoint/types';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

const SeparateRefsTable = () => {
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
			start_date: dateValue.start_date as number,
			end_date: dateValue.end_date as number,
			tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		{
			skip:
				dateValue.end_date === undefined || dateValue.start_date === undefined,
		}
	);

	// useEffect(() => {
	// 	if (isFetching) {
	// 		dispatch(uiActions.setLoading(true));
	// 	}

	// 	if (isSuccess && !isFetching) {
	// 		dispatch(uiActions.setLoading(false));
	// 	}
	// }, [isFetching, isSuccess]);

	useEffect(() => {
		if (dateValue.end_date !== undefined || dateValue.start_date !== undefined)
			refetch();
	}, [sortParams]);

	return (
		<div className='w-full grid grid-cols-[8ch,repeat(5,auto)] text-center overflow-auto'>
			<Thead setSortParams={setSortParams} />
			{isFetching && (
				<div className='col-span-6'>
					<Icon
						width={32}
						height={32}
						className='mx-auto'
						icon='line-md:loading-loop'
					/>
				</div>
			)}
			{isSuccess &&
				data.result &&
				data.result.refferal_links.map((refLink) => (
					<Tbody
						tbody={{
							bots: refLink.link_name,
							ca: refLink.conversion,
							payments: refLink.payments_count,
							pdp: refLink.per_client_price,
							profit: refLink.income_total,
							users: refLink.users_count,
						}}
					/>
				))}
		</div>
	);
};

export default SeparateRefsTable;
