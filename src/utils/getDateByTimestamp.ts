export function getToday() {
	const day = new Date();
	day.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 00:00:00.000
	const start = day.getTime() / 1000;
	day.setHours(23, 59, 59, 999); // Set hours, minutes, seconds, milliseconds to 23:59:59.999
	const end = day.getTime() / 1000;
	return {
		start,
		end,
	};
}

export function getYesterday() {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1); // Go back one day
	yesterday.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
	const startOfYesterday = yesterday.getTime() / 1000;

	const yesterdayEnd = new Date();
	yesterdayEnd.setDate(yesterdayEnd.getDate() - 1); // Go back one day
	yesterdayEnd.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
	const endOfYesterday = yesterdayEnd.getTime() / 1000;
	
	return {
		startOfYesterday,
		endOfYesterday,
	};
}

export function getWeek() {
	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days
	currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
	const startOfSevenDaysAgo = currentDate.getTime() / 1000;
	const today = new Date();
	const endDateNow = today.getTime() / 1000;

	return {
		start: startOfSevenDaysAgo,
		end: endDateNow,
	};
}

export function getMonth() {
	const now = new Date(); // Current date and time

	// Set the start date to one month ago
	const startDate = new Date();
	startDate.setMonth(now.getMonth() - 1); // Move one month back

	// Get timestamps (milliseconds since 1970) for start and end dates
	const startMonth = startDate.getTime() / 1000; // One month ago (start date)
	const endMonth = now.getTime() / 1000;

	return {
		startMonth,
		endMonth,
	};
}

export function getYear() {
	const currentDate = new Date();
	currentDate.setFullYear(currentDate.getFullYear() - 1); // Subtract 1 year
	currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
	const startOfOneYearAgoIn = currentDate.getTime() / 1000;
	const today = new Date();
	const endDateNow = today.getTime() / 1000;

	return {
		startYear: startOfOneYearAgoIn,
		endYear: endDateNow,
	};
}
