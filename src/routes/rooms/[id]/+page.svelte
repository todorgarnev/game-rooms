<script lang="ts">
	import type { PageData } from "../[id]/$types";

	export let data: PageData;
</script>

<h1>Room name: {data.room.name}</h1>
<h1>Username: {data.room.username}</h1>
