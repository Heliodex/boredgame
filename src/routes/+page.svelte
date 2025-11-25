<script lang="ts">
	import { noise } from "$lib/noise"

	const width = 21
	const height = 21

	const seed = 0.5

	const scale = 15
	const map = Array.from({ length: height }, (_, y) =>
		Array.from({ length: width }, (_, x) =>
			noise(x / scale, y / scale, seed)
		)
	)
</script>

{#each Array(height) as _, y}
	<div class="row">
		{#each Array(width) as _, x}
			<div class={["cell", map[y][x] > 0.6 ? "mountain" : "grass"]}></div>
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
		border: 2px solid black;
	}

	.mountain {
		background-color: grey;
	}

	.grass {
		background-color: green;
	}
</style>
