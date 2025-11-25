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
		--width: 1px;
	}

	.cell {
		width: 30px;
		height: 30px;
		box-sizing: border-box;
		border: var(--width) solid black;
	}

	/* add an extra border to every 7th */
	.cell:nth-child(10n) {
		border-right: var(--width) solid red;
	}
	.cell:nth-child(10n + 1) {
		border-left: var(--width) solid red;
	}
	.row:nth-child(10n) {
		border-bottom: var(--width) solid red;
	}
	.row:nth-child(10n + 1) {
		border-top: var(--width) solid red;
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
