import React, { FC, useState } from 'react';
import { UpDownArrows } from '../../../assets';
import { motion } from 'framer-motion';
import { ISortParams } from '../../../endpoint/types';

const arrowVariants = {
	up: {
		rotate: '0deg',
	},
	down: {
		rotate: '180deg',
	},
};

type typeSort =
	| 'users_count'
	| 'payments_count'
	| 'conversion'
	| 'per_client_price'
	| 'income_total';

const Thead: FC<{
	setSortParams: React.Dispatch<React.SetStateAction<ISortParams>>;
}> = ({ setSortParams }) => {
	const [usersCountSort, setUsersCountSort] = useState(true);
	const [paymentsCountSort, setPaymentsCountSort] = useState(false);
	const [conversionSort, setConversionSort] = useState(false);
	const [perclientPriceSort, setPerclientPriceSort] = useState(false);
	const [incomeTotalSort, setIncomeTotalSort] = useState(false);

	function handleSort(sort: typeSort) {
		switch (sort) {
			case 'users_count':
				setUsersCountSort((prev) => !prev);
				setSortParams({
					sort_by: 'users_count',
					order: usersCountSort ? 'desc' : 'asc',
				});
				break;
			case 'payments_count':
				setPaymentsCountSort((prev) => !prev);
				setSortParams({
					sort_by: 'payments_count',
					order: paymentsCountSort ? 'desc' : 'asc',
				});
				break;
			case 'conversion':
				setConversionSort((prev) => !prev);
				setSortParams({
					sort_by: 'conversion',
					order: conversionSort ? 'desc' : 'asc',
				});
				break;
			case 'per_client_price':
				setPerclientPriceSort((prev) => !prev);
				setSortParams({
					sort_by: 'per_client_price',
					order: perclientPriceSort ? 'desc' : 'asc',
				});
				break;
			case 'income_total':
				setIncomeTotalSort((prev) => !prev);
				setSortParams({
					sort_by: 'income_total',
					order: incomeTotalSort ? 'desc' : 'asc',
				});
				break;
		}
	}

	return (
		<>
			<p className='text-textColor max-w-[9ch] min-w-[7ch] text-sm font-medium px-1 mb-3 flex items-center justify-center'>
				Боты
			</p>
			<p
				className='text-textColor text-sm font-medium px-1 mb-3 flex items-center justify-center'
				onClick={() => handleSort('users_count')}>
				Польз.
				<motion.span
					variants={arrowVariants}
					animate={!usersCountSort ? 'down' : 'up'}>
					<UpDownArrows width={11} height={11} />
				</motion.span>
			</p>
			<p
				className='text-textColor text-sm font-medium px-1 mb-3 flex items-center justify-center'
				onClick={() => handleSort('payments_count')}>
				Оплаты
				<motion.span
					variants={arrowVariants}
					animate={!paymentsCountSort ? 'down' : 'up'}>
					<UpDownArrows width={11} height={11} />
				</motion.span>
			</p>
			<p
				className='text-textColor text-sm font-medium px-1 mb-3 flex items-center justify-center'
				onClick={() => handleSort('conversion')}>
				CA
				<motion.span
					variants={arrowVariants}
					animate={!conversionSort ? 'down' : 'up'}>
					<UpDownArrows width={11} height={11} />
				</motion.span>
			</p>
			<p
				className='text-textColor text-sm font-medium px-1 mb-3 flex items-center justify-center'
				onClick={() => handleSort('per_client_price')}>
				₽/ПДП
				<motion.span
					variants={arrowVariants}
					animate={!perclientPriceSort ? 'down' : 'up'}>
					<UpDownArrows width={11} height={11} />
				</motion.span>
			</p>
			<p
				className='text-textColor text-sm font-medium px-1 mb-3 flex items-center justify-center'
				onClick={() => handleSort('income_total')}>
				Доход{' '}
				<motion.span
					variants={arrowVariants}
					animate={!incomeTotalSort ? 'down' : 'up'}>
					<UpDownArrows width={11} height={11} />
				</motion.span>
			</p>
		</>
	);
};

export default Thead;
