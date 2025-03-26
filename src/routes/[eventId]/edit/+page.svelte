<script lang="ts">
	import type { PageData } from './$types';
	import EditForm from './EditForm.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	{#await data.event}
		<title>Edit Event - Event Planner</title>
	{:then event}
		{#if event}
			<title>Edit - {event.title} - Event Planner</title>
		{:else}
			<title>No Event Found - Event Planner</title>
		{/if}
	{/await}
</svelte:head>

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
