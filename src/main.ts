import homepage from "./index.html"

Bun.serve({
	routes: {
		"/": homepage,
	},
	development: true,
})

console.log("Server running on http://localhost:3000")