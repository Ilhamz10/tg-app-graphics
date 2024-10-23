import { FC, ReactNode, useEffect, useState } from 'react';
import { ArrowDown, GraphicIcon } from '../../assets';
import { motion } from 'framer-motion';

interface IAcordionCard {
	title: string | ReactNode;
	text: string | ReactNode;
	info: string | ReactNode;
	type: 'good' | 'bad';
	content: ReactNode;
	date: string | ReactNode;
	maxValue: number;
	maxPercentage: number;
	maxDate: string;
	setDate: React.Dispatch<React.SetStateAction<string>>;
	setPercentage: React.Dispatch<React.SetStateAction<number>>;
	setTitle: React.Dispatch<React.SetStateAction<number>>;
}

const dropdownVariants = {
	open: {
		height: 'auto',
	},
	close: {
		height: 0,
	},
};

const AccordionCard: FC<IAcordionCard> = ({
	title,
	text,
	info,
	type,
	content,
	date,
	maxValue,
	maxPercentage,
	maxDate,
	setDate,
	setPercentage,
	setTitle,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) {
			setPercentage(maxPercentage);
			setTitle(maxValue);
			setDate(maxDate);
		}
	}, [isOpen]);

	return (
		<div className='bg-bgColor rounded-lg'>
			<div
				onClick={() => setIsOpen((prev) => !prev)}
				className='flex items-center justify-between pr-6'>
				<div className={`grid gap-3 p-4 flex-1`}>
					<h2 className='text-2xl font-semibold text-textColor'>{title}</h2>
					<div className='grid grid-cols-[auto,auto,1fr] gap-1 items-center w-full'>
						<p className='font-medium text-subtitleColor'>{text}</p>
						<p
							className={`font-semibold grid grid-cols-[auto,auto] w-max gap-1 items-center ${
								type === 'good' ? 'text-green' : 'text-red'
							}`}>
							{info}{' '}
							<GraphicIcon
								className={`${type === 'good' ? 'text-green' : 'text-red'}`}
								width={23}
								height={11}
							/>
						</p>
						{isOpen && <p className='font-medium text-subtitleColor'>{date}</p>}
					</div>
				</div>
				<ArrowDown
					className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition`}
					width={30}
					height={30}
				/>
			</div>
			<motion.div
				initial={'close'}
				variants={dropdownVariants}
				animate={isOpen ? 'open' : 'close'}
				className={`overflow-hidden pt-0 px-3`}>
				{content}
			</motion.div>
		</div>
	);
};

export default AccordionCard;
