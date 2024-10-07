import React, { FC, useEffect, useState } from 'react';
import AccordionCard from '../../../shared/UI/AccordionCard';
import LineChart from './linec-chart';

interface IChartAccordion {
	maxValue: number;
	maxPercentage: number;
	text: string;
	chartData: { x: number; y: number; label: string }[];
	titleText: string;
}

const ChartAccordion: FC<IChartAccordion> = ({
	maxValue,
	maxPercentage,
	text,
	chartData,
	titleText,
}) => {
	const [title, setTitle] = useState(maxValue);
	const [percentage, setPercentage] = useState(0);
	const [date, setDate] = useState(chartData[chartData.length - 1].label);

	useEffect(() => {
		setPercentage(maxPercentage);
		setTitle(maxValue);
		setDate(chartData[chartData.length - 1].label);
	}, [maxPercentage, maxValue, chartData[chartData.length - 1].label]);

	return (
		<AccordionCard
			title={`${title} ${titleText}`}
			text={text}
			info={`${percentage > 0 ? '+' : ''}${percentage}%`}
			type={percentage < 0 ? 'bad' : 'good'}
			content={
				<LineChart
					type={maxPercentage < 0 ? 'bad' : 'good'}
					setPercentage={setPercentage}
					setTitle={setTitle}
					chartData={chartData}
					setDate={setDate}
				/>
			}
			date={date}
			setTitle={setTitle}
			setPercentage={setPercentage}
			maxValue={maxValue}
			maxPercentage={maxPercentage}
			maxDate={chartData[chartData.length - 1].label}
			setDate={setDate}
		/>
	);
};

export default ChartAccordion;
