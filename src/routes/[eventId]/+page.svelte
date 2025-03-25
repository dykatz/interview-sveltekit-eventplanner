<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.event}
	<h2 class="text-lg font-bold">{data.event.id}: {data.event.title}</h2>
	<p>{data.event.description}</p>
	<p>{data.event.date}</p>

	<div class="grid grid-cols-3 gap-2">
		<a class="btn" href="/">Back</a>
		<a class="btn" href={'/' + data.event.id + '/edit'}>Edit</a>
		<a class="btn" href={'/' + data.event.id + '/delete'}>Delete</a>
	</div>
{:else}
	<h2>No Event Found!</h2>
	<a class="btn" href="/">Back</a>
{/if}
