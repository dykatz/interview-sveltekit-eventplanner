<script lang="ts">
	import { page } from '$app/state';
</script>

<form method="POST" class="flex flex-col gap-4">
	<p>Are you sure you wish to delete this event?</p>
	<input class="btn" type="submit" value="Yes" />
	<a class="btn" href={'/' + page.params.eventId}>Cancel</a>
</form>
