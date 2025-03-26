<script lang="ts">
	import { enhance } from '$app/forms';
	import futureDate from '$lib/futureDate';

	let creating = $state(false);

	let title = $state('');
	let date = $state('');
	let isFutureDate = $derived(date === '' ? false : futureDate(date));
</script>

<svelte:head>
	<title>Add Event - Event Planner</title>
</svelte:head>

<form
	method="POST"
	class="flex flex-col gap-4"
	use:enhance={() => {
		creating = true;

		return async ({ update }) => {
			await update();
			creating = false;
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
		required
		disabled={creating}
		bind:value={title}
	/>
	<label for="description">Description</label>
	<textarea
		id="description"
		class="input"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
		disabled={creating}
	></textarea>
	<label for="date">Date</label>
	<input
		class="input"
		type="datetime-local"
		id="date"
		name="date"
		bind:value={date}
		required
		disabled={creating}
	/>
	{#if date !== '' && !isFutureDate}
		<p>Date is in the past!</p>
	{/if}
	<div class="grid grid-cols-2 gap-2">
		<button
			class="btn"
			type="submit"
			disabled={creating || title === '' || date === '' || !isFutureDate}
		>
			{#if creating}
				Creating...
			{:else}
				Create Event
			{/if}
		</button>
		{#if creating}
			<a class="btn btn-disabled" role="link" aria-disabled="true">Cancel</a>
		{:else}
			<a class="btn" href="/">Cancel</a>
		{/if}
	</div>
</form>
