<script lang="ts">
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";

	export let data: PageData;

	const onRoomClick = (id: number) => {
		goto(`rooms/${id}`);
	};
</script>

{#if data.rooms && data.rooms.length > 0}
	{#each data.rooms as room}
		<button class="room-name" on:click={() => onRoomClick(room.id)}>
			{room.name}
			<span>Join</span>
		</button>
	{/each}
{:else}
	<p>No rooms available</p>
{/if}

<style lang="postcss">
	.room-name {
		margin: 0 auto;
		padding: 0.5rem 2rem;
		display: block;
		background-color: var(--primary-100);
		color: #000;
		border: 0.1rem solid var(--primary-300);
		font-size: 1.6rem;
		cursor: pointer;

		&:not(:last-child) {
			margin-bottom: 2rem;
		}

		&:hover {
			background-color: var(--primary-300);
		}
	}
</style>
