<script lang="ts">
	import { enhance } from '$app/forms';
	import futureDate from '$lib/futureDate';
	import type { Event } from '$lib/server/remote-events';

	let { event }: { event: Event } = $props();

	let updating = $state(false);

	let date = $state(event.date ?? '');
	let isFutureDate = $derived(date === '' ? false : futureDate(date));
</script>

<form
	method="POST"
	class="flex flex-col gap-4"
	use:enhance={() => {
		updating = true;

		return async ({ update }) => {
			await update();
			updating = false;
		};
	}}
>
	<label for="title">Title</label>
	<input
		class="input"
		type="text"
		id="title"
		name="title"
		placeholder="Title"
		value={event.title}
		required
		disabled={updating}
	/>
	<label for="description">Description</label>
	<textarea
		id="description"
		class="input"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
		value={event.description}
		disabled={updating}
	></textarea>
	<label for="date">Date</label>
	<input
		class="input"
		type="datetime-local"
		id="date"
		name="date"
		bind:value={date}
		required
		disabled={updating}
	/>
	{#if date !== '' && !isFutureDate}
		<p>Date is in the past!</p>
	{/if}
	<div class="grid grid-cols-2 gap-2">
		<button class="btn" type="submit" disabled={updating || !isFutureDate}>
			{#if updating}
				Updating...
			{:else}
				Update Event
			{/if}
		</button>
		{#if updating}
			<a class="btn btn-disabled" role="link" aria-disabled="true">Cancel</a>
		{:else}
			<a class="btn" href={'/' + event.id}>Cancel</a>
		{/if}
	</div>
</form>
