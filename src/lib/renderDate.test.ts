import { describe, expect, it } from 'vitest';
import renderDate from './renderDate';

const fmt = new Intl.DateTimeFormat('default', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
});

function renderDateISO(date: Date) {
	const year = date.getUTCFullYear().toString().padStart(4, '0');
	const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const day = date.getUTCDate().toString().padStart(2, '0');
	const hour = date.getUTCHours().toString().padStart(2, '0');
	const minute = date.getUTCMinutes().toString().padStart(2, '0');
	const seconds = date.getUTCSeconds().toString().padStart(2, '0');

	return `${year}-${month}-${day}T${hour}:${minute}:${seconds}Z`;
}

describe('renderDate', () => {
	it('re-renders the ISO string in the user locale', () => {
		const date = new Date();
		const isoDate = renderDateISO(date);
		const localeDate = fmt.format(date);
		expect(renderDate(isoDate)).toBe(localeDate);
	});
});
