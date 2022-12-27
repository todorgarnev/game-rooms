<script lang="ts">
	import { roomName } from "../stores/notification";

	const clearNotification = () => {
		setTimeout(() => {
			roomName.set("")
		}, 3000)
	}

	$: if ($roomName) clearNotification();
</script>

{#if $roomName}
	<div class="notification">
		<span>	Room {$roomName} has been added!</span>
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
		background-color: var(--secondary-200);
		color: var(--dark-300);
		font-size: 1.4rem;
	}
</style>
