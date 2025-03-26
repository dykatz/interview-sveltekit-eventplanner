<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	let deleting = $state(false);
</script>

<svelte:head>
	<title>Delete Event - Event Planner</title>
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
	<div class="grid grid-cols-2 gap-2">
		<input class="btn" type="submit" value={deleting ? 'Deleting...' : 'Yes'} disabled={deleting} />
		{#if deleting}
			<a class="btn btn-disabled" role="link" aria-disabled="true">Cancel</a>
		{:else}
			<a class="btn" href={'/' + page.params.eventId}>Cancel</a>
		{/if}
	</div>
</form>
