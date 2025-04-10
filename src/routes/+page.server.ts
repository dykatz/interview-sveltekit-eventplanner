import { fetchAllEvents, toggleImportanceById } from '$lib/server/remote-events';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		events: fetchAllEvents()
	};
};

export const actions = {
	toggleImportance: async (event) => {
		const formData = await event.request.formData();
		const eventId = parseInt(formData.get('id')?.toString() ?? 'A');
		if (isNaN(eventId)) {
			return error(400, 'invalid event id');
		}
		await toggleImportanceById(eventId);
	},
} satisfies Actions;
