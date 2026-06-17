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
function genRiver(
	map: number[][],
	startX: number,
	startY = 0,
	direction = 0,
	forked = false
) {
	const riverE = 0.1
	let hasForked = forked

	let riverX = startX
	for (let y = startY; y < height; y++) {
		map[y][riverX] = riverE // randomly move left or right (sway to direction)
		const move = Math.random() + direction
		if (move < 0.4 && riverX > 0) {
			riverX--
			map[y][riverX] = riverE
		} else if (move > 0.6 && riverX < width - 1) {
			riverX++
			map[y][riverX] = riverE
		}

		if (Math.random() < 0.05 && riverX > 1 && hasForked === false) {
			const dir = Math.random() - 0.5

			hasForked = true
			genRiver(map, riverX - 1, y, dir, hasForked)

			// adjust main river to account for fork
			if (dir < 0) {
				if (riverX > 1) riverX -= 1
			} else if (riverX < width - 2) riverX += 1
		}
	}
}

// add a mountain at a random location
function genMountain(map: number[][]): boolean {
	const mountainMinE = 0.8
	const mountainMaxE = 1

	const centerX = Math.floor(Math.random() * width)
	const centerY = Math.floor(Math.random() * height)

	const maxRadius = Math.floor(Math.random() * 3) + 2

	// make sure river if far enough

	for (let y = centerY - maxRadius - 1; y < centerY + maxRadius + 1; y++) {
		if (y < 0 || y >= height) continue
		for (
			let x = centerX - maxRadius - 1;
			x < centerX + maxRadius + 1;
			x++
		) {
			if (x < 0 || x >= width) continue

			// if river too close, fail
			if (map[y][x] < 0.2) return false
		}
	}

	for (
		let y = Math.max(0, centerY - maxRadius);
		y < Math.min(height, centerY + maxRadius);
		y++
	) {
		for (
			let x = Math.max(0, centerX - maxRadius);
			x < Math.min(width, centerX + maxRadius);
			x++
		) {
			const dx = x - centerX
			const dy = y - centerY
			const dist = Math.sqrt(dx * dx + dy * dy)
			if (dist < maxRadius) {
				// elevation decreases with distance from center
				const elevation =
					mountainMinE +
					(mountainMaxE - mountainMinE) * (1 - dist / maxRadius)
				map[y][x] = Math.max(map[y][x], elevation)
			}
		}
	}

	return true
}

export function generateMap(): Terrain[][] {
	// elevation
	const map: number[][] = Array.from({ length: height }, () =>
		Array.from({ length: width }, () => 0.5)
	)

	const startX = Math.floor(Math.random() * width)
	genRiver(map, startX)

	const mountains = 5 + Math.floor(Math.random() * 5) // 5 to 10 mountains

	for (let m = 0; m < mountains; ) {
		if (genMountain(map)) m++
	}

	const final = rotateRandom(map)

	return final.map(row =>
		row.map(cell => {
			return getTerrain(cell)
		})
	)
}
