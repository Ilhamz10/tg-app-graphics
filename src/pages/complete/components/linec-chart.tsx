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
					data: chartData.map((data) => ({ ...data, title: 'test' })),
				},
			]}
			height={200}
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
					padding: {
						top: 5,
						right: 0,
						bottom: 3,
						left: 0,
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
								// Only trigger the event if the hovered point changes
								if (lastHoveredPoint.current !== dataPointIndex) {
									// Get the value of the hovered point
									const data =
										chartContext.w.config.series[0].data[dataPointIndex];
									setTitle(data.y);
									setDate(data.label);

									window.Telegram?.WebApp.HapticFeedback.impactOccurred(
										'light'
									);

									// const firstValue = chartData.find((chdata) => chdata.y > 0);

									// if (chartData[0].y === 0) {
									// 	if (firstValue) {
									// 		setPercentage(findPercent(data.y, firstValue.y, true));
									// 	} else {
									// 		setPercentage(findPercent(data.y, chartData[0].y, true));
									// 	}
									// } else {
									// 	setPercentage(findPercent(data.y, chartData[0].y, false));
									// }

									// Update the last hovered point
									lastHoveredPoint.current = dataPointIndex;

									// Optionally vibrate the device when the user hovers over a new data point
									// navigator.vibrate =
									// 	navigator.vibrate ||
									// 	(navigator as any).webkitVibrate ||
									// 	(navigator as any).mozVibrate ||
									// 	(navigator as any).msVibrate;

									// if (navigator.vibrate) {
									// 	navigator.vibrate(400);
									// }
								}
							}
						},
						markerClick(e, chartContext, config) {
							const dataPointIndex = config.dataPointIndex;
							const seriesIndex = config.seriesIndex;

							const data =
								chartContext.w.config.series[seriesIndex].data[dataPointIndex];

							setTitle(data.y);
							setDate(data.label);

							// const firstValue = chartData.find((chdata) => chdata.y > 0);

							// if (chartData[0].y === 0) {
							// 	if (firstValue) {
							// 		setPercentage(findPercent(data.y, firstValue.y, true));
							// 	} else {
							// 		setPercentage(findPercent(data.y, chartData[0].y, true));
							// 	}
							// } else {
							// 	setPercentage(findPercent(data.y, chartData[0].y, false));
							// }

							window.Telegram?.WebApp.HapticFeedback.impactOccurred('light');
							// if (navigator.vibrate) {
							// 	navigator.vibrate(200);
							// }
						},
					},
					parentHeightOffset: 0,
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
