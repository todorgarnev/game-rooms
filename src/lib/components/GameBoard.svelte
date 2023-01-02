<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { fly } from "svelte/transition";
	import { getCurrentScore } from "$lib/utils";
	import { GameType, type Round, type ServerRound } from "$lib/types";

	export let rounds: Round[];
	export let currentRound: ServerRound;
	export let opponentUsername: string;
	export let winner: string | null;
	export let myCurrentChoice: GameType | null;
	export let opponentCurrentChoice: GameType | null;
	export let myUserId: string;

	let userChoice: GameType | null;
	let showChoices: boolean = true;

	const submitFormData: SubmitFunction = ({ data }) => {
		data.append("userChoice", String(userChoice));
		showChoices = false;
	};

	$: userChoice = myCurrentChoice;
	$: showChoices =
		currentRound && currentRound.moves.length === 1 && currentRound.moves[0].user_id.id === myUserId
			? false
			: true;
</script>

{#if winner}
	<section class="top-section">
		<div>
			Game winner:
			<span class="winner">{winner}</span>
		</div>
	</section>
{:else}
	<section class="top-section">
		<div>
			{#if showChoices}
				<form class="choices" action="?/pick" method="POST" use:enhance={submitFormData}>
					<button type="submit" on:click={() => (userChoice = GameType.Rock)}>
						<i class="fa fa-hand-rock-o" />
						<p>Rock</p>
					</button>

					<button type="submit" on:click={() => (userChoice = GameType.Paper)}>
						<i class="fa fa-hand-paper-o" />
						<p>Paper</p>
					</button>

					<button type="submit" on:click={() => (userChoice = GameType.Scissors)}>
						<i class="fa fa-hand-scissors-o" />
						<p>Scissors</p>
					</button>

					<button type="submit" on:click={() => (userChoice = GameType.Lizard)}>
						<i class="fa fa-hand-lizard-o" />
						<p>Lizard</p>
					</button>

					<button type="submit" on:click={() => (userChoice = GameType.Spock)}>
						<i class="fa fa-hand-spock-o" />
						<p>Spock</p>
					</button>
				</form>
			{/if}
		</div>

		<div class="current-score">
			<span>Current score</span>
			<span class="result">{getCurrentScore(rounds, opponentUsername)}</span>
		</div>
	</section>

	<section class="main-section">
		<div>
			You -
			{#key userChoice}
				<span in:fly class="mine">
					{#if userChoice}
						<i class={`fa fa-hand-${userChoice}-o`} />
					{:else}
						?
					{/if}
				</span>
			{/key}
		</div>

		<div>
			{opponentUsername} -
			{#key opponentCurrentChoice}
				<span in:fly class="opponent">
					{#if opponentCurrentChoice}
						<i class={`fa fa-hand-${opponentCurrentChoice}-o`} />
					{:else}
						?
					{/if}
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
				<div>
					You picked
					<i class={`mine fa fa-hand-${round.moves[0].userChoice}-o`} />
				</div>

				<div>
					{opponentUsername} picked
					<i class={`opponent fa fa-hand-${round.moves[1].userChoice}-o`} />
				</div>
			</div>

			<div>
				Winner
				<span
					class={round.roundWinner === GameType.Tie
						? "tie"
						: round.roundWinner === opponentUsername
						? "mine"
						: "opponent"}
				>
					{round.roundWinner === GameType.Tie
						? "Tie"
						: round.roundWinner === opponentUsername
						? opponentUsername
						: "You"}
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

		& .choices button {
			display: inline-block;
			background-color: transparent;
			border: none;

			&:not(:last-child) {
				margin-right: 5rem;
			}

			& p {
				margin-top: 1rem;
				font-size: 2rem;
				color: var(--secondary-100);
			}

			& i {
				padding: 2rem;
				font-size: 6rem;
				color: var(--secondary-100);
				border: 0.6rem solid var(--secondary-100);
				border-radius: 100%;
				cursor: pointer;
			}

			& i:hover {
				color: var(--secondary-300);
				border-color: var(--secondary-300);
			}

			/* & .icon-option-selected {
				font-size: 60px;
				color: #f1c40f;
				border-radius: 100px;
				border: 6px solid #f1c40f;
				cursor: pointer;
				padding: 20px;
			} */
		}

		& .current-score {
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 3rem;

			& .result {
				font-size: 6rem;
				font-weight: bold;
			}
		}
	}

	.main-section {
		margin-bottom: 5rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		& div {
			display: flex;
			justify-content: center;
			font-size: 5rem;

			& span {
				margin-left: 3rem;
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

			& i {
				margin-left: 1rem;
			}
		}
	}

	.mine {
		color: var(--primary-300);
	}

	.opponent {
		color: var(--secondary-300);
	}

	.tie {
		color: dodgerblue;
	}
</style>
