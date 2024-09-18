import ReactApexChart from 'react-apexcharts';
import AccordionCard from '../../shared/UI/AccordionCard';
import { useRef, useState } from 'react';
import LineChart from './components/linec-chart';
import ChartAccordion from './components/chart-acordion';
import { findMaxPercent } from '../../utils/findMaxPercentage';

const secondData = [
	{ x: 1, y: 28190.34 },
	{ x: 2, y: 29720 },
	{ x: 3, y: 27849 },
	{ x: 4, y: 22900 },
	{ x: 5, y: 17450 },
	{ x: 6, y: 9400 },
	{ x: 7, y: 15370 },
	{ x: 8, y: 11450 },
	{ x: 9, y: 11200 },
	{ x: 10, y: 10200 },
];

const firstData = [
	{ x: 1, y: 10200 },
	{ x: 2, y: 11200 },
	{ x: 3, y: 11450 },
	{ x: 4, y: 15370 },
	{ x: 5, y: 9400 },
	{ x: 6, y: 17450 },
	{ x: 7, y: 22900 },
	{ x: 8, y: 27849 },
	{ x: 9, y: 29720 },
	{ x: 10, y: 28190.34 },
];

const Complete = () => {
	return (
		<>
			<div className='grid gap-2 mb-8'>
				<ChartAccordion
					maxPercentage={findMaxPercent(firstData)}
					maxValue={28190.34}
					text='Доход'
					titleText='₽'
					chartData={firstData}
				/>
				<ChartAccordion
					maxPercentage={findMaxPercent(secondData)}
					maxValue={28190.34}
					text='Пользователи'
					titleText='пдп'
					chartData={secondData}
				/>
			</div>
			<ul className='text-gray font-medium grid gap-4'>
				<li>Конверсия (CA): 3,6%</li>
				<li>Доход с пользователя (LTV): 1,45₽</li>
				<li>Доход со списаний: 8 000,32₽</li>
				<li>Доход с оплат: 8 000,32₽</li>
				<li>Пользователей (DatyBot): 1200</li>
				<li>Доход (DatyBot): 8 000,32₽</li>
			</ul>
		</>
	);
};

export default Complete;
