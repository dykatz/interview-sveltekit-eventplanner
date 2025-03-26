/**
 * `futureDate` parses a date string to see if it is in the future relative to
 * the present.
 * @param date The date to compare as a string
 * @returns If the date is in the future.
 */
function futureDate(date: string): boolean {
	const parsedDate = new Date(date);
	const currentDate = new Date();
	return parsedDate > currentDate;
}

export default futureDate;
