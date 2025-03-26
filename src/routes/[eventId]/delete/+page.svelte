<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	let { data }: { data: PageData } = $props();

	let deleting = $state(false);
</script>

<svelte:head>
	{#await data.event}
		<title>Delete Event - Event Planner</title>
	{:then event}
		{#if event}
			<title>Delete - {event.title} - Event Planner</title>
		{:else}
			<title>No Event Found - Event Planner</title>
		{/if}
	{/await}
</svelte:head>

<form
	method="POST"
	class="flex flex-col gap-4"
	use:enhance={() => {
		deleting = true;

		return async ({ update }) => {
			await update();
			deleting = false;
		};
	}}
>
	<p>Are you sure you wish to delete this event?</p>
	{#await data.event}
		<p>Loading...</p>
	{:then event}
		{#if event}
			<p>{event.title}</p>
		{:else}
			<title>No Event Found!</title>
		{/if}
	{/await}
	<div class="grid grid-cols-2 gap-2">
		<input class="btn" type="submit" value={deleting ? 'Deleting...' : 'Yes'} disabled={deleting} />
		{#if deleting}
			<a class="btn btn-disabled" role="link" aria-disabled="true">Cancel</a>
		{:else}
			<a class="btn" href={'/' + page.params.eventId}>Cancel</a>
		{/if}
	</div>
</form>
