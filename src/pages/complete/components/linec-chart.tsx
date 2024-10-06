import React, { FC, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ILineChart {
	setTitle: React.Dispatch<React.SetStateAction<number>>;
	setPercentage: React.Dispatch<React.SetStateAction<number>>;
	chartData: { x: number; y: number }[];
	type: 'good' | 'bad';
	setDate: React.Dispatch<React.SetStateAction<string>>;
}

const LineChart: FC<ILineChart> = ({
	setTitle,
	setPercentage,
	chartData,
	type,
	setDate,
}) => {
	const lastHoveredPoint = useRef<number | null>(null);

	return (
		<ReactApexChart
			series={[
				{
					name: 'Data Series',
					data: chartData,
				},
			]}
			options={{
				grid: {
					xaxis: {
						lines: {
							show: false,
						},
					},
					yaxis: {
						lines: {
							show: false,
						},
					},
				},
				chart: {
					type: 'line',
					height: 200,
					zoom: {
						enabled: false,
					},
					toolbar: {
						show: false,
					},
					events: {
						mouseMove: function (event, chartContext, config) {
							if (config.dataPointIndex !== -1) {
								const dataPointIndex = config.dataPointIndex;
								const seriesIndex = config.seriesIndex;

								// Only trigger the event if the hovered point changes
								if (lastHoveredPoint.current !== dataPointIndex) {
									// Get the value of the hovered point
									const data =
										chartContext.w.config.series[seriesIndex].data[
											dataPointIndex
										];
									setTitle(data.y);
									setDate(data.x);
									if (chartData[0].y === 0) setPercentage(0);
									else
										setPercentage(
											Number(
												(
													((data.y - chartData[0].y) / chartData[0].y) *
													100
												).toFixed(2)
											)
										);

									// Update the last hovered point
									lastHoveredPoint.current = dataPointIndex;

									// Optionally vibrate the device when the user hovers over a new data point
									if (navigator.vibrate) {
										navigator.vibrate(200);
									}
								}
							}
						},
						markerClick(e, chartContext, config) {
							const dataPointIndex = config.dataPointIndex;
							const seriesIndex = config.seriesIndex;
							const data =
								chartContext.w.config.series[seriesIndex].data[dataPointIndex];

							setTitle(data.y);
							setDate(data.x);

							if (chartData[0].y === 0) setPercentage(0);
							else
								setPercentage(
									Number(
										(
											((data.y - chartData[0].y) / chartData[0].y) *
											100
										).toFixed(2)
									)
								);
							if (navigator.vibrate) {
								navigator.vibrate(200);
							}
						},
					},
				},
				colors: [type === 'good' ? '#34C759' : '#FF3B30'],
				tooltip: {
					enabled: true,
					cssClass: '!hidden',
				},
				xaxis: {
					type: 'numeric',
					tooltip: {
						enabled: false,
					},
					labels: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					axisBorder: {
						show: false,
					},
				},
				yaxis: {
					title: {
						style: {
							cssClass: 'hidden',
						},
					},
					labels: {
						show: false,
					},
					show: false,
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: 'smooth',
					width: 2,
				},
			}}
		/>
	);
};

export default LineChart;
