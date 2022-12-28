<script lang="ts">
	import { username } from "$lib/stores/user";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if data.session}
	<p class="welcome">Welcome, {$username || data.session.user.email}</p>
{:else}
	<p>Let's learn how to register and login users!</p>
{/if}