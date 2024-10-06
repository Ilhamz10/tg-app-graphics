export function findMaxPercent(data: { x: number; y: number }[]) {
	const lastValue: number = data[data.length - 1].y;
	const firstValue: number = data[0].y;
	return findPercent(lastValue, firstValue);
}

export function findPercent(value: number, maxValue: number) {
	if (maxValue === 0) return 0;
	return Number((((value - maxValue) / maxValue) * 100).toFixed(2));
}
