<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#await data.event}
	<h2>Loading...</h2>
	<a class="btn" href="/">Back</a>
{:then event} 
	{#if event}
		<h2 class="text-lg font-bold">{event.title}</h2>
		<p>{event.description}</p>
		<p>{event.date}</p>

		<div class="grid grid-cols-3 gap-2">
			<a class="btn" href="/">Back</a>
			<a class="btn" href={'/' + event.id + '/edit'}>Edit</a>
			<a class="btn" href={'/' + event.id + '/delete'}>Delete</a>
		</div>
	{:else}
		<h2>No Event Found!</h2>
		<a class="btn" href="/">Back</a>
	{/if}
{/await}
