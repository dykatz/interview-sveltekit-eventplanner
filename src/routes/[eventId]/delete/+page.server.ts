import { deleteEventById } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ params }) => {
		const eventId = parseInt(params.eventId);
		await deleteEventById(eventId);
		redirect(303, '/');
	}
};
