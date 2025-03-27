import { expect, test } from '@playwright/test';

function renderDate(date: Date) {
	const year = date.getFullYear().toString().padStart(4, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hour = date.getHours().toString().padStart(2, '0');
	const minute = date.getMinutes().toString().padStart(2, '0');

	return `${year}-${month}-${day}T${hour}:${minute}`;
}

test('go through flow of creating and deleting an event', async ({ page }) => {
	await page.goto('/');

	// Navigate to the "Add Event" page
	const addEventButton = page.getByText('Add Event');
	await expect(addEventButton).toBeVisible();
	await addEventButton.click();

	// Get the elements we are going to use from the page
	const titleInput = page.getByLabel('Title');
	const dateInput = page.getByLabel('Date');
	const submitButton = page.getByText('Create Event');

	// Verify that an empty form cannot be submitted
	await expect(submitButton).toBeDisabled();

	// Add a title and verify that it still cannot be submitted
	await titleInput.fill('Hello From Playwright');
	await expect(submitButton).toBeDisabled();

	// Add a date in the past and verify that it still cannot be submitted, and that the warning is displayed
	await dateInput.fill('2025-01-01T16:34');
	await expect(submitButton).toBeDisabled();
	await expect(page.getByText('Date is in the past!')).toBeVisible();

	// Fill in the date with an hour in the future, and verify that it can now be clicked
	const newDate = new Date();
	newDate.setHours(newDate.getHours() + 1);
	const newDateStr = renderDate(newDate);
	await dateInput.fill(newDateStr);
	await expect(submitButton).not.toBeDisabled();

	// Create it and nav to the new page
	await submitButton.click();

	// Find the edit button and click on it to navigate to the edit page
	const editButton = page.getByText('Edit');
	await editButton.click();

	// Get the elements we are going to use from the page
	const titleInput2 = page.getByLabel('Title');
	const dateInput2 = page.getByLabel('Date');
	const submitButton2 = page.getByText('Update Event');

	// Verify that it can currently be submitted
	await expect(submitButton2).not.toBeDisabled();

	// Verify that the submit button becomes disabled when the title is removed
	await titleInput2.clear();
	await expect(submitButton2).toBeDisabled();
	await titleInput.fill('Hello From Playwright');

	// Verify that the submit button becomes disabled when the date is removed
	await dateInput2.clear();
	await expect(submitButton2).toBeDisabled();

	// Verify that the submit button is still disabled and the warning is displayed when a date in the past is entered
	await dateInput2.fill('2025-01-01T16:34');
	await expect(submitButton2).toBeDisabled();
	await expect(page.getByText('Date is in the past!')).toBeVisible();
	await dateInput2.clear();

	// Re-add the date and verify that the submit button becomes clickable again
	await dateInput2.fill(newDateStr);
	await expect(submitButton2).not.toBeDisabled();
	await submitButton2.click();

	// Find the delete button and click on it to navigate to the delete page
	const deleteButton = page.getByText('Delete');
	await deleteButton.click();

	// Find the delete button and click on it to actually delete the event
	const deleteButton2 = page.getByText('Yes');
	await deleteButton2.click();
});
