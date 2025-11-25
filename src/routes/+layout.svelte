<script lang="ts">
	import { applyAction } from "$app/forms"
	import favicon from "$lib/assets/favicon.svg"
	import "/src/app.css"

	let { children } = $props()
</script>

<svelte:head>
	<title>BoredGame</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children()}
</main>
