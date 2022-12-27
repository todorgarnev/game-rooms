<script lang="ts">
	import { roomName } from "../stores/notification";

	$: setTimeout(() => roomName.set(""), 3000)
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
		padding: 2rem 3rem;
		background-color: var(--secondary-200);
		color: var(--dark-300);
	}
</style>
