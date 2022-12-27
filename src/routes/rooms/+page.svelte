<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<a href="/" class="btn btn-primary">Home</a>

{#each data.rooms || [] as room}
	<div class="room-name">{room.name}</div>
{/each}

<style lang="postcss">
	a {
		margin-bottom: 2rem;
		display: inline-block;
	}

	.room-name {
		font-size: 1.6rem;

		&:not(:last-child) {
			margin-bottom: 1rem;
		}
	}
</style>
