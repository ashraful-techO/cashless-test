export function getThisWeekDateRange(): [Date, Date] {
	const today = new Date();
	const dayOfWeek = today.getDay();

	const daysSinceLastSaturday = (dayOfWeek + 1) % 7; // Adding 1 to handle Sunday as the first day of the week
	const lastSaturday = new Date(today);
	lastSaturday.setDate(today.getDate() - daysSinceLastSaturday);

	return [lastSaturday, today];
}

export function getLastWeekDateRange(): [Date, Date] {
	const today = new Date();
	const dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

	// Calculate the difference in days from today to the last Friday
	const daysUntilLastFriday = (dayOfWeek + 2) % 7; // Adding 5 to handle Sunday as the first day of the week
	const lastFriday = new Date(today);
	lastFriday.setDate(today.getDate() - daysUntilLastFriday);

	const prevSaturdayOfLastFriday = new Date();
	prevSaturdayOfLastFriday.setDate(lastFriday.getDate() - 6);

	return [prevSaturdayOfLastFriday, lastFriday];
}

export function getThisMonthDateRange(): [Date, Date] {
	const today = new Date();
	const firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
	return [firstDate, today];
}

export function getLastMonthDateRange(): [Date, Date] {
	const today = new Date();
	const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Go to the last month

	// Get the last day of the last month
	const lastMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

	// Set the last month's last day as the end date
	const endDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), lastMonthLastDay);
	return [lastMonth, endDate];
}
