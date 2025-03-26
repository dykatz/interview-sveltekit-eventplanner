<script lang="ts">
	import futureDate from '$lib/futureDate';
	import type { Event } from '$lib/server/remote-events';

	let { event }: { event: Event } = $props();
	let date = $state(event.date ?? '');
	let isFutureDate = $derived(date === '' ? false : futureDate(date));
</script>

<form method="POST" class="flex flex-col gap-4">
	<label for="title">Title</label>
	<input
		class="input"
		type="text"
		id="title"
		name="title"
		placeholder="Title"
		value={event.title}
		required
	/>
	<textarea
		id="description"
		class="input"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
		value={event.description}
	></textarea>
	<label for="date">Date</label>
	<input class="input" type="datetime-local" id="date" name="date" bind:value={date} required />
	{#if date !== '' && !isFutureDate}
		<p>Date is in the past!</p>
	{/if}
	<button class="btn" type="submit">Update Event</button>
	<a class="btn" href={'/' + event.id}>Cancel</a>
</form>
