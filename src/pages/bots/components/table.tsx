import { useEffect, useState } from 'react';
import { useGetAllBotsQuery } from '../../../endpoint/botsApi';
import Tbody from '../UI/tbody';
import Thead from '../UI/thead';
import { ISortParams } from '../../../endpoint/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { uiActions } from '../../../store/ui-slice';
import { Link } from 'react-router-dom';

const Table = () => {
	const dispatch = useAppDispatch();
	const { dateValue } = useAppSelector((state) => state.calendarReducer);
	const [sortParams, setSortParams] = useState<ISortParams>({
		order: 'asc',
		sort_by: 'users_count',
	});

	const { data, isFetching, isSuccess, refetch } = useGetAllBotsQuery(
		{
			order: sortParams.order,
			sort_by: sortParams.sort_by,
			start_date: dateValue.start_date as number,
			end_date: dateValue.end_date as number,
			tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
				data.result.projects.map((project) => (
					<Link
						to={`/?project_id=${project.project_id_encoded}`}
						className='col-span-6 grid grid-cols-[8ch,repeat(5,auto)]'>
						<Tbody
							tbody={{
								bots: project.bot_username,
								ca: project.conversion,
								payments: project.payments_count,
								pdp: project.per_client_price,
								profit: project.income_total,
								users: project.users_count,
							}}
						/>
					</Link>
				))}
		</div>
	);
};

export default Table;
