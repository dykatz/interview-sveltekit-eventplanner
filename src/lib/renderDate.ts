const fmt = new Intl.DateTimeFormat('default', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
});

function renderDate(date: string) {
	const newDate = new Date(date);
	return fmt.format(newDate);
}

export default renderDate;
