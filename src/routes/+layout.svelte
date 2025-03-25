<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex w-full justify-center p-4">
	<div class="flex w-96 flex-col gap-2">
		{@render children()}
	</div>
</div>
