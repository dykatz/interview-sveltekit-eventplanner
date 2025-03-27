<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error Adding Event - Event Planner</title>
</svelte:head>

<h2>Error Adding Event</h2>
<p>{page.error?.message ?? 'Unknown error'}</p>

<a class="btn" href="/">Return Home</a>
