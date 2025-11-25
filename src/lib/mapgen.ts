import { noise } from "$lib/noise"

const width = 21
const height = 21

type Terrain = "river" | "grass" | "hill" | "mountain"

function getTerrain(elevation: number): Terrain {
	if (elevation < 0.2) return "river"
	if (elevation < 0.7) return "grass"
	if (elevation < 0.9) return "hill"
	return "mountain"
}

// go from top to bottom, add a river
function genRiver(map: number[][]) {
	const startX = Math.floor(Math.random() * width)
	let riverX = startX
	for (let y = 0; y < height; y++) {
		const riverE = 0.1

		map[y][riverX] = riverE
		// randomly move left or right (sway to the centre)
		const move = Math.random() + (width / 2 - riverX) * 0.05
		if (move < 0.4 && riverX > 0) {
			riverX--
			map[y][riverX] = riverE
		} else if (move > 0.6 && riverX < width - 1) {
			riverX++
			map[y][riverX] = riverE
		}
	}
}

export function generateMap(): Terrain[][] {
	// elevation
	const map: number[][] = Array.from({ length: height }, () =>
		Array.from({ length: width }, () => 0.5)
	)

	genRiver(map)

	return map.map(row =>
		row.map(cell => {
			return getTerrain(cell)
		})
	)
}
