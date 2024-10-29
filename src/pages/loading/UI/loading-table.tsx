import { useState } from 'react';
import Thead from '../../bots/UI/thead';
import { ISortParams } from '../../../endpoint/types';
import { Icon } from '@iconify/react';

const LoadingTable = () => {
	const [_, setSortParams] = useState<ISortParams>({
		order: 'asc',
		sort_by: 'users_count',
	});
	return (
		<div className='w-full grid grid-cols-[8ch,repeat(5,auto)] text-center overflow-auto'>
			<Thead setSortParams={setSortParams} />
			<div className='col-span-6'>
				<Icon
					width={32}
					height={32}
					className='mx-auto'
					icon='line-md:loading-loop'
					color='var(--tg-theme-text-color)'
				/>
			</div>
		</div>
	);
};

export default LoadingTable;
