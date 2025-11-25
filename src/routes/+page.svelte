<script lang="ts">
	import { generateMap } from "$lib/mapgen"

	const map = generateMap()
</script>

{#each map as row}
	<div class="row">
		{#each row as cell}
			<div class={["cell", cell]}></div>
		{/each}
	</div>
{/each}

<style>
	.row {
		display: flex;
	}

	.cell {
		width: 2rem;
		height: 2rem;
		box-sizing: border-box;
		/* border: 1px solid black; */
	}

	.river {
		background-color: hsl(223, 100%, 50%);
	}
	.grass {
		background-color: hsl(120 100 25);
	}
	.hill {
		background-color: hsla(30, 100%, 36%, 0.727);
	}
	.mountain {
		background-color: hsl(0 0 30);
	}
</style>
