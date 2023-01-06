<script lang="ts">
	import { slide } from "svelte/transition";
	import type { PageData } from "./$types";

	export let data: PageData;
	export let animate: boolean = false;

	const toggleAnimation = () => {
		animate = !animate;
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if data.session}
	<p class="welcome">Welcome, {data.username || data.session.user.email}</p>

	{#if !data.username}
		<p class="set-username">
			You should set your username first. <br /> You can do it in <b>Profile</b> page or click
			<a href="/profile">here</a>
		</p>
	{:else}
		<div class="rules">
			Here you can create a <a href="/rooms">room</a> or join already existing one. <br />
			There you can start a game against another user. <br />
			The game is Rock, Paper, Scissors, Lizard, Spock. <br />

			<details>
				<summary on:click={toggleAnimation}>Rules</summary>

				{#if animate}
					<div transition:slide>
						The game is an expansion on the game Rock, Paper, Scissors. <br />
						Each player picks a variable and reveals it at the same time. <br />
						The winner is the one who defeats the others. <br />
						In a tie, the process is repeated until a winner is found.

						<ul>
							<li>Scissors cuts Paper</li>
							<li>Paper covers Rock</li>
							<li>Rock crushes Lizard</li>
							<li>Lizard poisons Spock</li>
							<li>Spock smashes Scissors</li>
							<li>Scissors decapitates Lizard</li>
							<li>Lizard eats Paper</li>
							<li>Paper disproves Spock</li>
							<li>Spock vaporizes Rock</li>
							<li>Rock crushes Scissors</li>
						</ul>
					</div>
				{/if}
			</details>
		</div>

		<iframe
			width="1070"
			height="713"
			src="https://www.youtube.com/embed/Kov2G0GouBw"
			title="Rock Paper scissors  Lizard Spock"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	{/if}
{:else}
	<p>
		You can register from <a href="/register">here</a>. <br />
		If you already have an account you can login <a href="/login">here</a>.
	</p>
{/if}

<style lang="postcss">
	.rules,
	p {
		font-size: 2rem;
	}

	a,
	b {
		color: var(--primary-100);
	}

	details {
		margin-top: 5rem;

		&:hover {
			cursor: pointer;
		}

		& ul {
			list-style: none;
			font-size: 1.8rem;
			font-style: italic;
		}
	}

	iframe {
		width: 30vmax;
		height: calc(30vmax / 1.5);
	}

	ul,
	iframe,
	.rules,
	.set-username {
		margin-top: 5rem;
	}
</style>
