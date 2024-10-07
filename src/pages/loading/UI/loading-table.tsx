import React, { useState } from 'react';
import Tbody from '../../bots/UI/tbody';
import Thead from '../../bots/UI/thead';
import { ISortParams } from '../../../endpoint/types';

const LoadingTable = () => {
	const [sortParams, setSortParams] = useState<ISortParams>({
		order: 'asc',
		sort_by: 'users_count',
	});
	return (
		<div className='w-full grid grid-cols-[8ch,repeat(5,auto)] text-center'>
			<Thead setSortParams={setSortParams} sortParams={sortParams} />
			<Tbody
				tbody={{
					bots: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					ca: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					payments: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					pdp: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					profit: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					users: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
				}}
			/>
			<Tbody
				tbody={{
					bots: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					ca: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					payments: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					pdp: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					profit: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					users: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
				}}
			/>
		</div>
	);
};

export default LoadingTable;
