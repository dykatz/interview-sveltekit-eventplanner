<script lang="ts">
	import type { PageData } from './$types';
	import renderDate from '$lib/renderDate';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Event Planner</title>
</svelte:head>

<div class="flex items-baseline justify-between">
	<h1 class="text-2xl">Events</h1>
	<a class="btn" href="/newevent" role="button">Add Event</a>
</div>

{#await data.events}
	<p>Loading...</p>
{:then events}
	{#each events as event (event.id)}
		<a href={'/' + event.id} class="btn flex justify-between">
			<div>{event.title}</div>
			<div>{renderDate(event.date)}</div>
		</a>
	{:else}
		<p>No events found!</p>
	{/each}
{/await}
