<script lang="ts">
	import { enhance } from "$app/forms";
	import { username } from "$lib/stores/user";
	import type { ActionData, PageData } from "./$types";

	export let form: ActionData;
	export let data: PageData;

	$: username.set(data.username);
</script>

<form action="?/update" method="POST" use:enhance>
	<input
		class={form?.errors?.username ? "input-error" : ""}
		type="text"
		name="username"
		value={form?.data?.username || data.username}
	/>

	{#if form?.errors?.username}
		<span class="error">{form.errors.username[0]}</span>
	{/if}

	<button type="submit" class="btn btn-primary">Update</button>
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
