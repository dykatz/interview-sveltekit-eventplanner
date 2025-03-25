function futureDate(date: string): boolean {
	const parsedDate = new Date(date);
	const currentDate = new Date();
	return parsedDate > currentDate;
}

export default futureDate;
