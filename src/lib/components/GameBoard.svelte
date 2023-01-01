<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { fly } from "svelte/transition";
	import { getCurrentScore } from "$lib/utils";
	import type { Round } from "$lib/types";

	export let rounds: Round[];
	console.log("rounds: ", rounds);
	export let opponentUsername: string;
	export let winner: string | null;
	export let availableNumbers: number[];
	export let myCurrentNumber: number | null;
	export let opponentCurrentNumber: number | null;

	let selectedNumber: number | null;

	const submitFormData: SubmitFunction = ({ data }) => {
		data.append("selectedNumber", String(selectedNumber));
	};

	$: selectedNumber = myCurrentNumber;
</script>

{#if winner}
	<section class="top-section">
		<div>
			Game winner:
			<span class="winner">{winner}</span>
			with
			<span class="winner">{getCurrentScore(rounds, opponentUsername)}</span>
			rounds
		</div>
	</section>
{:else}
	<section class="top-section">
		<form class="numbers" action="?/pick" method="POST" use:enhance={submitFormData}>
			{#each availableNumbers as number}
				<button class="number" on:click={() => (selectedNumber = number)} type="submit">
					{number}
				</button>
			{/each}
		</form>

		<div class="current-score">
			<span>Current score</span>
			<span class="result">{getCurrentScore(rounds, opponentUsername)}</span>
		</div>
	</section>

	<section class="main-section">
		<div>
			You -
			{#key selectedNumber}
				<span in:fly class="mine">
					{selectedNumber || "?"}
				</span>
			{/key}
		</div>

		<div>
			{opponentUsername} -
			{#key opponentCurrentNumber}
				<span in:fly class="opponent">
					{opponentCurrentNumber || "?"}
				</span>
			{/key}
		</div>
	</section>
{/if}

<section class="bottom-section">
	{#each rounds.reverse() as round}
		<div class="round-info">
			<span>Round {round.roundNumber}</span>

			<div class="round-picks">
				<span>
					You picked
					<span class="mine">{round.moves[0].selectedNumber}</span>
				</span>

				<span>
					{opponentUsername} picked
					<span class="opponent">{round.moves[1].selectedNumber}</span>
				</span>
			</div>

			<div>
				Winner
				<span class={round.roundWinner === opponentUsername ? "mine" : "opponent"}>
					{round.roundWinner === opponentUsername ? opponentUsername : "You"}
				</span>
			</div>
		</div>
	{/each}
</section>

<style lang="postcss">
	.top-section {
		margin-bottom: 5rem;
		display: grid;
		grid-template-columns: 80% 20%;
		font-size: 4rem;

		& .winner {
			color: var(--primary-100);
			font-size: 4.5rem;
			font-weight: bold;
		}

		& .numbers {
			display: flex;
			justify-content: space-between;
			text-align: left;

			& .number {
				padding: 0 2rem;
				color: rgb(26, 23, 23);
				background-color: var(--primary-300);
				border: 0.3rem solid var(--primary-100);

				&:hover {
					background-color: var(--primary-200);
					cursor: pointer;
				}
			}
		}

		& .current-score {
			display: flex;
			flex-direction: column;
			font-size: 2rem;

			& .result {
				font-size: 3rem;
				font-weight: bold;
			}
		}
	}

	.main-section {
		margin-bottom: 5rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		& div {
			font-size: 5rem;

			& span {
				font-size: 6rem;
				font-weight: bold;
			}
		}
	}

	.bottom-section {
		& div {
			font-size: 2rem;
		}

		& .round-info {
			padding: 2rem 0;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: center;
			border-bottom: 0.2rem solid var(--primary-100);

			& .round-picks {
				display: grid;
			}
		}
	}

	.mine {
		color: var(--primary-300);
	}

	.opponent {
		color: var(--secondary-300);
	}
</style>
