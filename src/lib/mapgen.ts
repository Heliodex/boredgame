import { noise } from "$lib/noise"

const width = 30
const height = 30

type Terrain = "river" | "grass" | "hill" | "mountain"

function getTerrain(elevation: number): Terrain {
	if (elevation < 0.2) return "river"
	if (elevation < 0.7) return "grass"
	if (elevation < 0.9) return "hill"
	return "mountain"
}

function rotate90(map: number[][]): number[][] {
	const newMap: number[][] = Array.from({ length: width }, () =>
		Array.from({ length: height }, () => 0)
	)

	for (let y = 0; y < height; y++)
		for (let x = 0; x < width; x++) newMap[x][height - y - 1] = map[y][x]

	return newMap
}

function rotateRandom(map: number[][]) {
	const times = Math.floor(Math.random() * 4)

	let newMap = map
	for (let t = 0; t < times; t++) newMap = rotate90(newMap)

	return newMap
}

// go from top to bottom, add a river
function genRiver(map: number[][]) {
	const startX = Math.floor(Math.random() * width)
	let riverX = startX
	for (let y = 0; y < height; y++) {
		const riverE = 0.1

		map[y][riverX] = riverE
		// randomly move left or right (sway to the centre)
		const move = Math.random() + (width / 2 - riverX) * 0.03
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

	const final = rotateRandom(map)

	return final.map(row =>
		row.map(cell => {
			return getTerrain(cell)
		})
	)
}
