<script lang="ts">
	import { notificationText } from "../stores/notification";

	const clearNotification = () => {
		setTimeout(() => {
			notificationText.set(null);
		}, 3000);
	};

	$: if ($notificationText) clearNotification();
</script>

{#if $notificationText}
	<div class="notification">
		<span>{$notificationText}</span>
	</div>
{/if}

<style lang="postcss">
	.notification {
		position: fixed;
		left: 50%;
		top: 5rem;
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		transform: translateX(-50%);
		background-color: var(--primary-200);
		color: var(--dark-300);
		font-size: 1.4rem;
	}
</style>
