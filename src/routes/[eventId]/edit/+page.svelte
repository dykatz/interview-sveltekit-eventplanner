<script lang="ts">
	import type { PageData } from './$types';
	import futureDate from '$lib/futureDate';

	let { data }: { data: PageData } = $props();
	let date = $state(data.event?.date ?? '');
	let isFutureDate = $derived(date === '' ? false : futureDate(date));
</script>

{#if data.event}
	<form method="POST" class="flex flex-col gap-4">
		<label for="title">Title</label>
		<input
			class="input"
			type="text"
			id="title"
			name="title"
			placeholder="Title"
			value={data.event.title}
			required
		/>
		<textarea
			id="description"
			class="input"
			name="description"
			rows="4"
			cols="50"
			placeholder="Description"
			value={data.event.description}
		></textarea>
		<label for="date">Date</label>
		<input class="input" type="datetime-local" id="date" name="date" bind:value={date} required />
		{#if date !== '' && !isFutureDate}
			<p>Date is in the past!</p>
		{/if}
		<button class="btn" type="submit">Update Event</button>
		<a class="btn" href={'/' + data.event.id}>Cancel</a>
	</form>
{:else}
	<h2>No Event Found!</h2>
	<a class="btn" href="/">Back</a>
{/if}
