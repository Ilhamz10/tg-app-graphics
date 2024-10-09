import { useEffect, useState } from 'react';
import { useGetAllBotsQuery } from '../../../endpoint/botsApi';
import Tbody from '../UI/tbody';
import Thead from '../UI/thead';
import { ISortParams } from '../../../endpoint/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { uiActions } from '../../../store/ui-slice';

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
		<div className='w-full grid grid-cols-[8ch,repeat(5,auto)] text-center'>
			{isSuccess && data.result && data.result.projects.length > 0 ? (
				<>
					<Thead sortParams={sortParams} setSortParams={setSortParams} />
					{data.result.projects.map((project) => (
						<Tbody
							key={project.bot_username}
							tbody={{
								bots: project.bot_username,
								ca: project.conversion,
								payments: project.payments_count,
								pdp: project.per_client_price,
								profit: project.income_total,
								users: project.users_count,
							}}
						/>
					))}
				</>
			) : (
				<>

					{/* Тут должен быть эмодзи: (apple robot_1f916) */}
					<h1 className="col-span-full text-center mt-9">
						🤖 Нет доступных ботов
					</h1>
				</>
			)}
		</div>
	);
};

export default Table;
