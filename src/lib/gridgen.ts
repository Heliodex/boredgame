const width = 90
const height = 90
const colours = 7

function getColour(t: number): string {
	if (t === 0) return "bg"
	return `r${t % colours}`
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

type Line = [number, number, number]

function randomPoint(line: Line): number {
	const [_, x1, x2] = line
	const x = Math.floor(Math.random() * (x2 - x1)) + x1

	return x
}

function genStartEnd(max: number, prev: Line): [number, number] {
	const minLength = 20

	// const start = Math.floor(Math.random() * (max - minLength))
	const start = randomPoint(prev)
	const end =
		Math.floor(Math.random() * (max - start - minLength)) +
		start +
		minLength

	return [start, end]
}

function set(map: number[][], x: number, y: number, i: number) {
	if (x < 0 || x >= width || y < 0 || y >= height) return
	map[y][x] = i
}

function drawLine(map: number[][], i: number, prev: Line): Line {
	const y = Math.floor(Math.random() * height)
	const [x1, x2] = genStartEnd(width, prev)

	for (let x = x1; x < x2; x++) {
		// at least 1 space above or below
		if (map?.[y + 1]?.[x] !== 0 || map?.[y - 1]?.[x] !== 0)
			return [y, x1, x - 1]

		if (map[y][x] !== 0) return [y, x1, x - 1]
		set(map, x, y, i)
	}

	return [y, x1, x2]
}

export function generateMap(): string[][] {
	// elevation
	let map: number[][] = Array.from({ length: height }, () =>
		Array.from({ length: width }, () => 0)
	)

	const lines = 50

	const startLine: Line = [
		Math.floor(height / 2),
		Math.floor(width * 0.25),
		Math.floor(width * 0.75),
	]

	const prevs = [startLine]

	for (let i = 1; i <= colours; i++) {
		for (let j = 1; j <= lines; j++) {
			const randPrev = prevs[Math.floor(Math.random() * prevs.length)]

			prevs.push(drawLine(map, i, randPrev))
			map = rotate90(map)
		}
	}

	return map.map(row =>
		row.map(cell => {
			return getColour(cell)
		})
	)
}
