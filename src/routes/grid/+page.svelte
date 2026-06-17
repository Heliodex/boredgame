<script lang="ts">
import { generateMap } from "$lib/gridgen"

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
		width: 10px;
		height: 10px;
		box-sizing: border-box;
		/*border: var(--width) solid black;*/
	}

	.bg {
		background-color: dimgrey;
	}
	.r1 {
		background-color: red;
	}
	.r2 {
		background-color: orange;
	}
	.r3 {
		background-color: yellow;
	}
	.r4 {
		background-color: green;
	}
	.r5 {
		background-color: cornflowerblue;
	}
	.r6 {
		background-color: indigo;
	}
	.r7 {
		background-color: darkorchid;
	}
</style>
