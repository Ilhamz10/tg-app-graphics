import { motion } from 'framer-motion';
import React from 'react';
import AccordionCard from '../../../shared/UI/AccordionCard';
import { graphicLoadingImg } from '../../../assets';

const CompleteLoading = () => {
	return (
		<>
			<div className='grid gap-2 mb-8'>
				<AccordionCard
					setPercentage={() => {}}
					setTitle={() => {}}
					maxPercentage={0}
					maxValue={0}
					maxDate='0'
					setDate={() => {}}
					content={
						<div className='px-3 pb-3'>
							<img src={graphicLoadingImg} className='w-full loading' />
						</div>
					}
					title={
						<div className='min-w-36 max-w-36 w-full bg-[#DCDCE2] h-8 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[37px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					info={
						<div className='min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					date={
						<div className='max-w-28 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					text={'Доход'}
					type='good'
				/>
				<AccordionCard
					setPercentage={() => {}}
					setTitle={() => {}}
					maxPercentage={0}
					maxValue={0}
					maxDate='0'
					setDate={() => {}}
					content={
						<div className='px-3 pb-3'>
							<img src={graphicLoadingImg} className='w-full loading' />
						</div>
					}
					title={
						<div className='min-w-36 max-w-36 w-full bg-[#DCDCE2] h-8 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[37px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					info={
						<div className='min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					date={
						<div className='max-w-28 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					text={'Пользователи'}
					type='good'
				/>
				<AccordionCard
					setPercentage={() => {}}
					setTitle={() => {}}
					maxPercentage={0}
					maxValue={0}
					maxDate='0'
					setDate={() => {}}
					content={
						<div className='px-3 pb-3'>
							<img src={graphicLoadingImg} className='w-full loading' />
						</div>
					}
					title={
						<div className='min-w-36 max-w-36 w-full bg-[#DCDCE2] h-8 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[37px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					info={
						<div className='min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					date={
						<div className='max-w-28 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
							<div className='bg-white w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
						</div>
					}
					text={'Оплаты'}
					type='good'
				/>
			</div>
			<ul className='text-gray font-medium grid gap-4'>
				<li className='max-w-44 bg-[#DCDCE2] h-5 rounded-lg flex justify-end relative loading'>
					<div className='bg-[#EBEBF0] w-3 h-[24px] blur-[2px] absolute -right-1 -top-[2px]' />
				</li>
				<li className='max-w-44 bg-[#DCDCE2] h-5 rounded-lg flex justify-end relative loading'>
					<div className='bg-[#EBEBF0] w-3 h-[24px] blur-[2px] absolute -right-1 -top-[2px]' />
				</li>
				<li className='max-w-44 bg-[#DCDCE2] h-5 rounded-lg flex justify-end relative loading'>
					<div className='bg-[#EBEBF0] w-3 h-[24px] blur-[2px] absolute -right-1 -top-[2px]' />
				</li>
				<li className='max-w-44 bg-[#DCDCE2] h-5 rounded-lg flex justify-end relative loading'>
					<div className='bg-[#EBEBF0] w-3 h-[24px] blur-[2px] absolute -right-1 -top-[2px]' />
				</li>
				<li className='max-w-44 bg-[#DCDCE2] h-5 rounded-lg flex justify-end relative loading'>
					<div className='bg-[#EBEBF0] w-3 h-[24px] blur-[2px] absolute -right-1 -top-[2px]' />
				</li>
			</ul>
		</>
	);
};

export default CompleteLoading;
