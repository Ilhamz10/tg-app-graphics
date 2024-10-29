import { useEffect, useState } from 'react';
import Tbody from '../UI/tbody';
import Thead from '../UI/thead';
import { uiActions } from '../../../store/ui-slice';
import { useGetBotReferalsQuery } from '../../../endpoint/referalsApi';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { ISortParams } from '../../../endpoint/types';
import LoadingTable from '../../loading/UI/loading-table';

const RefsTable = () => {
	const dispatch = useAppDispatch();
	const { refId } = useAppSelector((state) => state.uiReducer);
	const { dateValue } = useAppSelector((state) => state.calendarReducer);
	const [sortParams, setSortParams] = useState<ISortParams>({
		order: 'asc',
		sort_by: 'users_count',
	});

	const { data, isFetching, isSuccess, refetch } = useGetBotReferalsQuery(
		{
			order: sortParams.order,
			sort_by: sortParams.sort_by,
			project_id_encoded: refId as string,
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
		refetch();
	}, [sortParams]);

	if (isFetching) {
		return <LoadingTable />;
	}

	if (isSuccess && !isFetching) {
		return (
			<div className='w-full grid grid-cols-[8ch,repeat(5,auto)] text-center overflow-auto'>
				<Thead setSortParams={setSortParams} />
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
	}
};

export default RefsTable;
