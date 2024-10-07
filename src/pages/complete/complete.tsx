import ChartAccordion from './components/chart-acordion';
import { findMaxPercent } from '../../utils/findMaxPercentage';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IDateParams } from '../../endpoint/types';
import {
	getMonth,
	getToday,
	getWeek,
	getYear,
	getYesterday,
} from '../../utils/getDateByTimestamp';
import {
	useGetClientsStatisticQuery,
	useGetIncomeStatisticQuery,
	useGetPaymentsCountStatisticQuery,
	useGetStatisticRawQuery,
} from '../../endpoint/userStatisticApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { uiActions } from '../../store/ui-slice';
import { calendarActions } from '../../store/calendar-slice';

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
	{ x: 1, y: 1, label: 'text' },
	{ x: 2, y: 2, label: 'text' },
	{ x: 3, y: 4, label: 'text' },
	{ x: 4, y: 0, label: 'text' },
	{ x: 5, y: 5, label: 'text' },
	{ x: 6, y: 7, label: 'text' },
	{ x: 7, y: 8, label: 'text' },
	{ x: 8, y: 9, label: 'text' },
	{ x: 9, y: 11, label: 'text' },
	{ x: 10, y: 0, label: 'text' },
];

const Complete = () => {
	const location = useLocation();
	const { dateValue } = useAppSelector((state) => state.calendarReducer);
	const dispatch = useAppDispatch();

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

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				const { start, end } = getToday();
				dispatch(
					calendarActions.setCalendarState([
						new Date(start * 1000).toUTCString(),
						new Date(end * 1000).toUTCString(),
					])
				);
				break;
			case '/yesterday':
				const { startOfYesterday, endOfYesterday } = getYesterday();
				dispatch(
					calendarActions.setCalendarState([
						new Date(startOfYesterday * 1000).toUTCString(),
						new Date(endOfYesterday * 1000).toUTCString(),
					])
				);
				break;
			case '/week':
				const { start: startWeek, end: endWeek } = getWeek();
				dispatch(
					calendarActions.setCalendarState([
						new Date(startWeek * 1000).toUTCString(),
						new Date(endWeek * 1000).toUTCString(),
					])
				);
				break;
			case '/month':
				const { startMonth, endMonth } = getMonth();
				dispatch(
					calendarActions.setCalendarState([
						new Date(startMonth * 1000).toUTCString(),
						new Date(endMonth * 1000).toUTCString(),
					])
				);
				break;
			case '/year':
				const { startYear, endYear } = getYear();
				dispatch(
					calendarActions.setCalendarState([
						new Date(startYear * 1000).toUTCString(),
						new Date(endYear * 1000).toUTCString(),
					])
				);
				break;
		}
	}, [location.pathname]);

	useEffect(() => {
		if (
			isFetching ||
			clientsChartIsLoading ||
			paymentsCountChartIsLoading ||
			incomeChartIsLoading
		) {
			dispatch(uiActions.setLoading(true));
		} else if (
			isSuccess &&
			clientsChartIsSuccess &&
			paymentsCountChartIsSuccess &&
			incomeChartIsSuccess
		) {
			dispatch(uiActions.setLoading(false));
		}
	}, [
		isFetching,
		isSuccess,
		clientsChartIsLoading,
		clientsChartIsSuccess,
		paymentsCountChartIsLoading,
		paymentsCountChartIsSuccess,
		incomeChartIsLoading,
		incomeChartIsSuccess,
	]);

	return (
		<>
			<div className='grid gap-2 mb-8'>
				{incomeChartIsSuccess && incomeChart.result.graph.length > 0 && (
					<ChartAccordion
						maxPercentage={findMaxPercent(incomeChart.result.graph)}
						maxValue={
							incomeChart.result.graph[incomeChart.result.graph.length - 1].y
						}
						text='Доход'
						titleText='₽'
						chartData={incomeChart.result.graph}
					/>
				)}
				{clientsChartIsSuccess && clientsChart.result.graph.length > 0 && (
					<ChartAccordion
						maxPercentage={findMaxPercent(clientsChart.result.graph)}
						maxValue={
							clientsChart.result.graph[clientsChart.result.graph.length - 1].y
						}
						text='Пользователи'
						titleText='пдп'
						chartData={clientsChart.result.graph}
					/>
				)}
				{paymentsCountChartIsSuccess &&
					paymentsCountChart.result.graph.length > 0 && (
						<ChartAccordion
							maxPercentage={findMaxPercent(paymentsCountChart.result.graph)}
							maxValue={
								paymentsCountChart.result.graph[
									paymentsCountChart.result.graph.length - 1
								].y
							}
							text='Оплаты'
							titleText='шт'
							chartData={paymentsCountChart.result.graph}
						/>
					)}
			</div>
			{isSuccess && (
				<ul className='text-gray font-medium grid gap-4'>
					<li>Конверсия (CA): {data.conversion}%</li>
					<li>Доход с пользователя (LTV): {data.per_client_income}₽</li>
					<li>Доход со списаний: {data.income_withdraw}₽</li>
					<li>Доход с оплат: {data.income_payments}₽</li>
					<li>Пользователей (DatyBot): {data.datybot.users}</li>
					<li>Доход (DatyBot): {data.datybot.total_income}₽</li>
				</ul>
			)}
		</>
	);
};

export default Complete;
