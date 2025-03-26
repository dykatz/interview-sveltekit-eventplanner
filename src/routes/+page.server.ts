import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		events: fetchAllEvents()
	};
};
