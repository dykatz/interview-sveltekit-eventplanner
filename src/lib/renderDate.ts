const fmt = new Intl.DateTimeFormat('default', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
});

/**
 * `renderDate` parses a string as a date, and re-renders it using the user's
 * locale.
 * @param date The raw date string to render
 * @returns The date re-rendered in the user's locale
 */
function renderDate(date: string) {
	const newDate = new Date(date);
	return fmt.format(newDate);
}

export default renderDate;
