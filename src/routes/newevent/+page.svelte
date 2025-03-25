<script lang="ts">
</script>

<form method="POST" class="flex flex-col gap-4">
	<!-- form for creating new event -->
	<label for="title">Title</label>
	<input class="input" type="text" id="title" name="title" placeholder="Title" required />
	<textarea
		id="description"
		class="input"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
	></textarea>
	<label for="date">Date</label>
	<input class="input" type="datetime-local" id="date" name="date" required />
	<button class="btn" type="submit">Create Event</button>
	<a class="btn" href="/">Cancel</a>
</form>
