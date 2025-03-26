<script lang="ts">
	import type { PageData } from './$types';
	import EditForm from './EditForm.svelte';

	let { data }: { data: PageData } = $props();
</script>

{#await data.event}
	<h2>Loading...</h2>
	<a class="btn" href="/">Back</a>
{:then event}
	{#if event}
		<EditForm {event} />
	{:else}
		<h2>No Event Found!</h2>
		<a class="btn" href="/">Back</a>
	{/if}
{/await}
