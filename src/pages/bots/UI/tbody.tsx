import { FC, ReactNode } from 'react';

interface ITBody {
	tbody: {
		bots: string | ReactNode;
		users: number | ReactNode;
		payments: number | ReactNode;
		ca: number | ReactNode;
		pdp: number | ReactNode;
		profit: number | ReactNode;
	};
}

const Tbody: FC<ITBody> = ({ tbody }) => {
	return (
		<>
			<div className='py-2 bg-bgColor mb-2 rounded-l-lg'>
				<p className='max-w-[9ch] min-w-[7ch] break-words text-textColor text-sm font-medium line-clamp-2 px-1 bg-bgColor'>
					{tbody.bots}
				</p>
			</div>
			<p className='mb-2 text-textColor text-sm font-medium  bg-bgColor grid items-center'>
				<span className='border-l border-[#DCDCE2] grid items-center py-2 px-1'>
					{tbody.users}
				</span>
			</p>
			<p className='mb-2 text-textColor text-sm font-medium bg-bgColor grid items-center'>
				<span className='border-l border-[#DCDCE2] grid items-center py-2 px-1'>
					{tbody.payments}
				</span>
			</p>
			<p className='mb-2 text-textColor text-sm font-medium bg-bgColor grid items-center'>
				<span className='border-l border-[#DCDCE2] grid items-center py-2 px-1'>
					{tbody.ca}{typeof tbody.ca === 'number' ? '%' : ''}
				</span>
			</p>
			<p className='mb-2 text-textColor text-sm font-medium bg-bgColor grid items-center'>
				<span className='border-l border-[#DCDCE2] grid items-center py-2 px-1'>
					{tbody.pdp}{typeof tbody.ca === 'number' ? '₽' : ''}
				</span>
			</p>
			<p className='mb-2 text-textColor text-sm font-medium bg-bgColor grid items-center rounded-r-lg'>
				<span className='border-l border-[#DCDCE2] grid items-center py-2 px-1'>
					{tbody.profit}{typeof tbody.ca === 'number' ? '₽' : ''}
				</span>
			</p>
		</>
	);
};

export default Tbody;
