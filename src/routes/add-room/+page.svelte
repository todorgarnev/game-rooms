<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<form action="?/add" method="POST" use:enhance>
	<input
		class={form?.errors?.name ? "input-error" : ""}
		type="text"
		name="name"
		value={form?.data?.name || ""}
	/>

	{#if form?.errors?.name}
		<span class="error">{form.errors.name[0]}</span>
	{/if}

	<button type="submit" class="btn btn-primary">Add</button>
</form>

<style lang="postcss">
	form {
		margin: 0 auto 2rem;
		display: flex;
		flex-direction: column;
		width: 30rem;
	}

	input {
		margin-bottom: 2rem;
	}
</style>
