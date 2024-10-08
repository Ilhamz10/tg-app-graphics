export function findMaxPercent(data: { x: number; y: number }[]) {
	const lastValue: number = data[data.length - 1].y;
	const firstValue: number = data[0].y;
	return findPercent(lastValue, firstValue);
}

export function findPercent(
	value: number,
	maxValue: number,
	isFirstZero?: boolean
) {
	// if (maxValue === 0 && value > 0) {
	// 	if (prevValue && prevValue > 0 && prevValue < value) {
	// 		const percent = findPercent(value, prevValue) as number;
	// 		return 100 + percent;
	// 	} else if (prevValue && prevValue > 0 && prevValue > value) {
	// 		const percent = findPercent(prevValue, value) as number;
	// 		return percent - 100
	// 	} else return 100;
	// } else
	if (maxValue === 0) return 0;
	return (
		Number((((value - maxValue) / maxValue) * 100).toFixed(2)) +
		(isFirstZero ? 100 : 0)
	);
}
