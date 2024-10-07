import { useEffect, useState } from 'react';
import { useGetAllBotsQuery } from '../../../endpoint/botsApi';
import Tbody from '../UI/tbody';
import Thead from '../UI/thead';
import { ISortParams } from '../../../endpoint/types';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { uiActions } from '../../../store/ui-slice';

const Table = () => {
	const dispatch = useAppDispatch();
	const [sortParams, setSortParams] = useState<ISortParams>({
		order: 'asc',
		sort_by: 'users_count',
	});

	const { data, isLoading, isSuccess, refetch } = useGetAllBotsQuery({
		order: sortParams.order,
		sort_by: sortParams.sort_by,
	});

	useEffect(() => {
		if (isLoading) {
			dispatch(uiActions.setLoading(true));
		}

		if (isSuccess) {
			dispatch(uiActions.setLoading(false));
		}
	}, [isLoading, isSuccess]);

	useEffect(() => {
		refetch();
	}, [sortParams]);

	return (
		<div className='w-full grid grid-cols-[8ch,repeat(5,auto)] text-center'>
			<Thead sortParams={sortParams} setSortParams={setSortParams} />
			{isSuccess &&
				data.result &&
				data.result.projects.map((project) => (
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
				))}
		</div>
	);
};

export default Table;
