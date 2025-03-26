<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex items-baseline justify-between">
	<h1 class="text-2xl">Events</h1>
	<a class="btn" href="/newevent" role="button">Add Event</a>
</div>

{#await data.events}
	<p>Loading...</p>
{:then events}
	{#each events as event}
		<a href={'/' + event.id} class="btn flex justify-between">
			<div>{event.title}</div>
			<div>{event.date}</div>
		</a>
	{:else}
		<p>No events found!</p>
	{/each}
{/await}
