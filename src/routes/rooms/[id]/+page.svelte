<script lang="ts">
	import { enhance } from "$app/forms";
	import GameBoard from "$lib/components/GameBoard.svelte";
	import type { PageData } from "../[id]/$types";

	export let data: PageData;
</script>

<section class="header-section">
	<div>
		<h3>Room name: <span>{data.name}</span></h3>
		<h3>Users: <span>{data.usernames.length > 0 ? data.usernames : "no users"}</span></h3>
	</div>

	<div>
		{#if !data.usersIds.includes(data.session?.user.id ?? "") && data.usersIds.length < 2}
			<form action="?/join" method="POST" use:enhance>
				<button class="btn btn-primary" type="submit">Join</button>
			</form>
		{/if}

		{#if data.usersIds.includes(data.session?.user.id ?? "") && !data.isGameStarted}
			<form action="?/leave" method="POST" use:enhance>
				<button class="btn btn-primary" type="submit">Leave</button>
			</form>
		{/if}

		{#if data.usersIds.includes(data.session?.user.id ?? "") && data.usersIds.length === 2 && !data.isGameStarted}
			<form action="?/start" method="POST" use:enhance>
				<button class="btn btn-primary start-game" type="submit">Start game</button>
			</form>
		{/if}
	</div>

	<!-- <h3>Current score:{}/{}</h3> -->
</section>

{#if data.isGameStarted}
	<GameBoard
		rounds={data.rounds}
		opponentUsername={data.opponent}
		winner={data.winner}
		myCurrentChoice={data.myCurrentChoice}
		opponentCurrentChoice={data.opponentCurrentChoice}
	/>
{/if}

<style lang="postcss">
	.header-section {
		margin-bottom: 5rem;
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

		& .start-game {
			margin-top: 1rem;
		}
	}
</style>
