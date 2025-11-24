import homepage from "./src/index.html"

Bun.serve({
	routes: {
		"/": homepage,
		"/favicon.ico": () => new Response(null, { status: 204 }),
	},
	development: true,
})

console.log("Server running on http://localhost:3000")
