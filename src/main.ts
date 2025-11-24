const canvas = document.getElementById("game") as HTMLCanvasElement
if (!canvas) throw new Error("Canvas element not found")

// force canvas to be full screen
const observer = new ResizeObserver(() => {
	canvas.width = canvas.clientWidth
	canvas.height = canvas.clientHeight
})
observer.observe(canvas)

type GameState = {
	// state
}

// draw image data
function update(
	state: GameState,
	width: number,
	height: number
): [Uint8ClampedArray, GameState] {
	const data = new Uint8ClampedArray(width * height * 4)

	const squareSize = 50
	const startX = Math.floor((width - squareSize) / 2)
	const startY = Math.floor((height - squareSize) / 2)

	for (let y = 0; y < squareSize; y++) {
		for (let x = 0; x < squareSize; x++) {
			const index = ((startY + y) * width + (startX + x)) * 4
			data[index] = 255 // R
			data[index + 1] = 0 // G
			data[index + 2] = 0 // B
			data[index + 3] = 255 // A
		}
	}

	return [data, state]
}
// animation loop
function animate(state: GameState = {}) {
	const ctx = canvas.getContext("2d")
	if (!ctx) return

	const { width, height } = canvas
	const imageData = ctx.createImageData(width, height)

	const [data, newState] = update(state, width, height)

	imageData.data.set(data)
	ctx.putImageData(imageData, 0, 0)

	requestAnimationFrame(() => animate(newState))
}
animate()
