import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import EditForm from './EditForm.svelte';

function renderDateISO(date: Date) {
	const year = date.getUTCFullYear().toString().padStart(4, '0');
	const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const day = date.getUTCDate().toString().padStart(2, '0');
	const hour = date.getUTCHours().toString().padStart(2, '0');
	const minute = date.getUTCMinutes().toString().padStart(2, '0');
	const seconds = date.getUTCSeconds().toString().padStart(2, '0');

	return `${year}-${month}-${day}T${hour}:${minute}:${seconds}Z`;
}

test('renders content passed to it', async () => {
	const user = userEvent.setup();

	render(EditForm, {
		event: {
			id: 1,
			title: 'Hello, World',
			description: 'A basic event',
			date: '2025-03-27T00:45:32Z'
		}
	});

	// Validate that the elements exist in the document
	const submit = screen.getByText('Update Event');
	expect(submit).toBeInTheDocument();

	const titleInput = screen.getByLabelText('Title');
	expect(titleInput).toBeInTheDocument();
	expect(titleInput).toHaveDisplayValue('Hello, World');

	const description = screen.getByLabelText('Description');
	expect(description).toBeInTheDocument();
	expect(description).toHaveDisplayValue('A basic event');

	const date = screen.getByLabelText('Date');
	expect(date).toBeInTheDocument();

	// NOTE: The following commented code is what I would do, but it appears that date inputs are not functional in jsdom...

	// Validate that the current date set is in the past
	// expect(screen.getByText('Date is in the past!')).toBeInTheDocument();
	// expect(submit).toBeDisabled();

	// Unset the date and validate that the message will go away, while still being unable to submit
	// await user.clear(date);

	// expect(screen.queryByText('Date is in the past!')).not.toBeInTheDocument();
	// expect(submit).toBeDisabled();

	// Type a new date into the field and validate that the message is still not present and the user can now submit
	// const newDate = new Date();
	// newDate.setHours(newDate.getHours() + 1);
	// await user.type(date, renderDateISO(newDate));

	// expect(screen.queryByText('Date is in the past!')).not.toBeInTheDocument();
	// expect(submit).not.toBeDisabled();
});
