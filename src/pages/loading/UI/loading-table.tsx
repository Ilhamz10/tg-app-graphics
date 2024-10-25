import { useState } from 'react';
import Thead from '../../bots/UI/thead';
import { ISortParams } from '../../../endpoint/types';
import { Icon } from '@iconify/react';

const LoadingTable = () => {
	const [sortParams, setSortParams] = useState<ISortParams>({
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
				/>
			</div>
			{/* <Tbody
				tbody={{
					bots: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					ca: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					payments: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					pdp: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					profit: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					users: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
				}}
			/>
			<Tbody
				tbody={{
					bots: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					ca: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					payments: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					pdp: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					profit: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
					users: (
						<div className='my-2 min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					),
				}}
			/> */}
		</div>
	);
};

export default LoadingTable;
