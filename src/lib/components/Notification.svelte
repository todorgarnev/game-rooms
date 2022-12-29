<script lang="ts">
	import { showNewRoom } from "../stores/notification";

	const clearNotification = () => {
		setTimeout(() => {
			showNewRoom.set(false)
		}, 3000)
	}

	$: if ($showNewRoom) clearNotification();
</script>

{#if $showNewRoom}
	<div class="notification">
		<span>	New room has been added!</span>
		<a href="/rooms">Go to rooms page</a>
	</div>
{/if}

<style lang="postcss">
	.notification {
		position: fixed;
		right: 2rem;
		top: 2rem;
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		background-color: var(--primary-200);
		color: var(--dark-300);
		font-size: 1.4rem;

		& a {
			font-weight: bold;
			text-decoration: underline;
		}
	}
</style>
