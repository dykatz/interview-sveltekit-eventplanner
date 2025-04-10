import { updateEventById } from '$lib/server/remote-events';
import futureDate from '$lib/futureDate';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ params, request }) => {
		const eventId = parseInt(params.eventId);
		const formdata = await request.formData();
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();
		const important = formdata.get('important')?.toString();
		if (!title || !date) {
			error(400, 'Title and Date are required');
		}
		if (!futureDate(date)) {
			error(400, 'Date must be in the future');
		}
		await updateEventById(eventId, {
			title,
			description,
			date, 
			important: important === 'on'
		});
		redirect(303, `/${eventId}`);
	}
};
