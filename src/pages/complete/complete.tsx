// import ChartAccordion from './components/chart-acordion';
import { findMaxPercent } from '../../utils/findMaxPercentage';
import { memo } from 'react';
import {
	useGetClientsStatisticQuery,
	useGetIncomeStatisticQuery,
	useGetPaymentsCountStatisticQuery,
	useGetStatisticRawQuery,
} from '../../endpoint/userStatisticApi';
import { useAppSelector } from '../../hooks/redux-hooks';
import LoadingGraphic from '../loading/UI/loading-graphic';
import LoadingCompleteData from '../loading/UI/loading-complete-data';
import ChartAccordion from './components/chart-acordion';

// const secondData = [
// 	{ x: 0, y: 1, label: 'text' },
// 	{ x: 1, y: 1, label: 'text' },
// 	{ x: 2, y: 5, label: 'text' },
// 	{ x: 3, y: 10, label: 'text' },
// 	{ x: 4, y: 0, label: 'text' },
// ];

const Complete = memo(() => {
	const { dateValue } = useAppSelector((state) => state.calendarReducer);

	const { data, isFetching, isSuccess } = useGetStatisticRawQuery(
		{
			start_date: dateValue.start_date as number,
			end_date: dateValue.end_date as number,
			tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		{
			skip:
				dateValue.end_date === undefined || dateValue.start_date === undefined,
		}
	);
	const {
		data: clientsChart,
		isFetching: clientsChartIsLoading,
		isSuccess: clientsChartIsSuccess,
	} = useGetClientsStatisticQuery(
		{
			start_date: dateValue.start_date as number,
			end_date: dateValue.end_date as number,
			tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		{
			skip:
				dateValue.end_date === undefined || dateValue.start_date === undefined,
		}
	);
	const {
		data: paymentsCountChart,
		isFetching: paymentsCountChartIsLoading,
		isSuccess: paymentsCountChartIsSuccess,
	} = useGetPaymentsCountStatisticQuery(
		{
			start_date: dateValue.start_date as number,
			end_date: dateValue.end_date as number,
			tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		{
			skip:
				dateValue.end_date === undefined || dateValue.start_date === undefined,
		}
	);
	const {
		data: incomeChart,
		isFetching: incomeChartIsLoading,
		isSuccess: incomeChartIsSuccess,
	} = useGetIncomeStatisticQuery(
		{
			start_date: dateValue.start_date as number,
			end_date: dateValue.end_date as number,
			tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		{
			skip:
				dateValue.end_date === undefined || dateValue.start_date === undefined,
		}
	);

	return (
		<>
			<div className='grid gap-2 mb-8'>
				{incomeChartIsLoading ? (
					<LoadingGraphic />
				) : (
					incomeChartIsSuccess &&
					incomeChart.result.graph.length > 0 && (
						<ChartAccordion
							maxPercentage={findMaxPercent(incomeChart.result.graph)}
							maxValue={incomeChart.result.graph.reduce(
								(acc, graph) => acc + graph.y,
								0
							)}
							text='Доход'
							titleText='₽'
							chartData={incomeChart.result.graph}
						/>
					)
				)}
				{clientsChartIsLoading ? (
					<LoadingGraphic />
				) : (
					clientsChartIsSuccess &&
					clientsChart.result.graph.length > 0 && (
						<ChartAccordion
							maxPercentage={findMaxPercent(clientsChart.result.graph)}
							maxValue={clientsChart.result.graph.reduce(
								(acc, graph) => acc + graph.y,
								0
							)}
							text='Пользователи'
							titleText='пдп'
							chartData={clientsChart.result.graph}
						/>
					)
				)}
				{paymentsCountChartIsLoading ? (
					<LoadingGraphic />
				) : (
					paymentsCountChartIsSuccess &&
					paymentsCountChart.result.graph.length > 0 && (
						<ChartAccordion
							maxPercentage={findMaxPercent(paymentsCountChart.result.graph)}
							maxValue={paymentsCountChart.result.graph.reduce(
								(acc, graph) => acc + graph.y,
								0
							)}
							text='Оплаты'
							titleText='шт'
							chartData={paymentsCountChart.result.graph}
						/>
					)
				)}
			</div>
			{isFetching ? (
				<LoadingCompleteData />
			) : (
				isSuccess && (
					<ul className='text-gray font-medium grid gap-4'>
						<li>Конверсия (CA): {data.conversion}%</li>
						<li>Доход с пользователя (LTV): {data.per_client_income}₽</li>
						<li>Доход со списаний: {data.income_withdraw}₽</li>
						<li>Доход с оплат: {data.income_payments}₽</li>
						<li>Пользователей (DatyBot): {data.datybot.users}</li>
						<li>Доход (DatyBot): {data.datybot.total_income}₽</li>
					</ul>
				)
			)}
		</>
	);
});

export default Complete;
