<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";

	let selectedNumber: number;

	const submitFormData: SubmitFunction = ({ data }) => {
		data.append("selectedNumber", String(selectedNumber));
	};
</script>

<section class="top-section">
	<form class="numbers" action="?/pick" method="POST" use:enhance={submitFormData}>
		{#each Array.from({ length: 10 }, (_, i) => i + 1) as number}
			<button
				class={`number${selectedNumber === number ? " selected" : ""}`}
				on:click={() => (selectedNumber = number)}
				type="submit"
			>
				{number}
			</button>
		{/each}
	</form>

	<div class="current-score">
		<span>Current score</span>
		<span class="result">1:5</span>
	</div>
</section>

<section class="main-section">
	<div>
		You
		<div>{selectedNumber ?? ""}</div>
	</div>

	<div>
		Pesho
		<div>{selectedNumber ?? ""}</div>
	</div>
</section>

<style lang="postcss">
	.top-section {
		margin-bottom: 5rem;
		display: grid;
		grid-template-columns: 80% 20%;

		& .numbers {
			display: flex;
			justify-content: space-between;
			text-align: left;

			& .number {
				padding: 0 2rem;
				color: rgb(26, 23, 23);
				font-size: 4rem;
				background-color: var(--primary-300);
				border: 0.3rem solid var(--primary-100);

				&:hover {
					background-color: var(--primary-200);
					cursor: pointer;
				}

				&.picked {
					background-color: var(--error);
					border-color: tomato;
					cursor: not-allowed;
				}

				&.selected {
					opacity: 0.4;
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
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		& div {
			font-size: 5rem;
		}
	}
</style>
