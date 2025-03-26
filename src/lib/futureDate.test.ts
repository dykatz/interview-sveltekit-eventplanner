import { describe, expect, it } from 'vitest';
import futureDate from './futureDate';

function renderDateISO(date: Date) {
	const year = date.getUTCFullYear().toString().padStart(4, '0');
	const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const day = date.getUTCDate().toString().padStart(2, '0');
	const hour = date.getUTCHours().toString().padStart(2, '0');
	const minute = date.getUTCMinutes().toString().padStart(2, '0');
	const seconds = date.getUTCSeconds().toString().padStart(2, '0');

	return `${year}-${month}-${day}T${hour}:${minute}:${seconds}Z`;
}

describe('futureDate', () => {
	it('returns false for the past', () => {
		const date = new Date();
		date.setHours(date.getHours() - 1);
		const dateStr = renderDateISO(date);
		expect(futureDate(dateStr)).toBe(false);
	});

	it('returns true for the future', () => {
		const date = new Date();
		date.setHours(date.getHours() + 1);
		const dateStr = renderDateISO(date);
		expect(futureDate(dateStr)).toBe(true);
	});
});
