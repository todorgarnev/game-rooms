<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "../[id]/$types";

	export let data: PageData;
</script>

<section class="header-section">
	<div>
		<h3>Room name: <span>{data.name}</span></h3>
		<h3>Users:  <span>{data.usernames.length > 0 ? data.usernames : "no users"}</span></h3>
	</div>

	{#if !data.usersIds.includes(data.session?.user.id ?? "")}
		<form action="?/join" method="POST" use:enhance>
			<button class="btn btn-primary" type="submit">Join</button>
		</form>
	{/if}

	{#if data.usersIds.includes(data.session?.user.id ?? "")}
	<form action="?/leave" method="POST" use:enhance>
		<button class="btn btn-primary" type="submit">Leave</button>
	</form>
{/if}
</section>

<style lang="postcss">
	.header-section {
		display: flex;
		justify-content: space-between;
		text-align: left;

		& h3 {
			font-size: 1.8rem;
		}

		& span {
			font-size: 1.4rem;
			color: var(--primary-300);
		}
	}
</style>
