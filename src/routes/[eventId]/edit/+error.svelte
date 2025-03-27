<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error Editing Event - Event Planner</title>
</svelte:head>

<h2>Error Editing Event</h2>
<p>{page.error?.message ?? 'Unknown error'}</p>

<div class="grid grid-cols-2 gap-2">
	<a class="btn" href={'/' + page.params.eventId}>Return to Event</a>
	<a class="btn" href="/">Return Home</a>
</div>
