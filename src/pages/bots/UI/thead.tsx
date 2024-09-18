import React, { useState } from 'react';
import { UpDownArrows } from '../../../assets';
import { motion } from 'framer-motion';

const arrowVariants = {
	up: {
		rotate: '0deg',
	},
	down: {
		rotate: '180deg',
	},
};

const Thead = () => {
	const [isDown, setIsDown] = useState(false);

	return (
		<>
			<p className='text-[#8E8E93] max-w-[9ch] min-w-[7ch] text-sm font-medium px-1 mb-3 flex items-center justify-center'>
				Боты
			</p>
			<p className='text-[#8E8E93] text-sm font-medium px-1 mb-3 flex items-center justify-center'>
				Польз.
			</p>
			<p className='text-[#8E8E93] text-sm font-medium px-1 mb-3 flex items-center justify-center'>
				Оплаты
			</p>
			<p className='text-[#8E8E93] text-sm font-medium px-1 mb-3 flex items-center justify-center'>
				CA
			</p>
			<p className='text-[#8E8E93] text-sm font-medium px-1 mb-3 flex items-center justify-center'>
				₽/ПДП
			</p>
			<p
				onClick={() => setIsDown((prev) => !prev)}
				className='text-black text-sm font-medium px-1 mb-3 flex items-center justify-center'>
				Доход{' '}
				<motion.span variants={arrowVariants} animate={isDown ? 'down' : 'up'}>
					<UpDownArrows width={11} height={11} />
				</motion.span>
			</p>
		</>
	);
};

export default Thead;
