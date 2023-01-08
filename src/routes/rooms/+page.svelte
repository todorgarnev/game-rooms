<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import type { ActionData, PageData } from "./$types";

	export let data: PageData;
	export let form: ActionData;

	const onRoomClick = (id: number) => {
		goto(`rooms/${id}`);
	};
</script>

<svelte:head>
	<title>Rooms</title>
</svelte:head>

<section>
	<div>
		<h3>Create new room</h3>

		<form action="?/add" method="POST" use:enhance>
			<input
				class={form?.errors?.name ? "input-error" : ""}
				type="text"
				name="name"
				value={form?.data?.name || ""}
			/>

			{#if form?.errors?.name}
				<span class="error">{form.errors.name[0]}</span>
			{/if}

			<button type="submit" class="btn btn-primary">Add</button>
		</form>
	</div>

	<div>
		<h3>Active rooms</h3>

		{#if data.activeRooms.length > 0}
			{#each data.activeRooms as room}
				<button class="room-name" on:click={() => onRoomClick(room.id)}>
					{room.name} -
					<span class={room.usernames.length === 2 ? "full" : ""}>{room.usernames.length}/2</span>
				</button>
			{/each}
		{:else}
			<p>No rooms available</p>
		{/if}
	</div>

	<div>
		<h3>My rooms</h3>

		{#if data.myRooms.length > 0}
			{#each data.myRooms as room}
				<button class="room-name" on:click={() => onRoomClick(room.id)}>
					{room.name} -
					<span class={room.usernames.length === 2 ? "full" : ""}>{room.usernames.length}/2</span>
				</button>
			{/each}
		{:else}
			<p>No rooms available</p>
		{/if}
	</div>

	<div>
		<h3>Live rooms</h3>

		{#if data.liveRooms.length > 0}
			{#each data.liveRooms as room}
				<button class="room-name" on:click={() => onRoomClick(room.id)}>
					{room.name} -
					<span class={room.usernames.length === 2 ? "full" : ""}>{room.usernames.length}/2</span>
				</button>
			{/each}
		{:else}
			<p>No rooms available</p>
		{/if}
	</div>

	<div>
		<h3>Finished rooms</h3>

		{#if data.finishedRooms.length > 0}
			{#each data.finishedRooms as room}
				<button class="room-name" on:click={() => onRoomClick(room.id)}>
					{room.name} -
					<span class={room.usernames.length === 2 ? "full" : ""}>{room.usernames.length}/2</span>
				</button>
			{/each}
		{:else}
			<p>No rooms available</p>
		{/if}
	</div>
</section>

<style lang="postcss">
	section {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 5rem;

		& h3 {
			margin-bottom: 3rem;
			font-size: 1.8rem;
		}

		& form {
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			max-width: 30rem;

			& input {
				margin-top: 0;
			}
		}

		& input {
			margin: 2rem 0;
		}

		& span {
			font-weight: bold;

			&.full {
				color: var(--error);
			}
		}

		& .room-name {
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

		@media --medium-viewport {
			grid-template-columns: repeat(3, 1fr);
		}

		@media --small-viewport {
			grid-template-columns: repeat(2, 1fr);
		}

		@media --smallest-viewport {
			grid-template-columns: 1fr;
		}
	}
</style>
