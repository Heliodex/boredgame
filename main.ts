import homepage from "./index.html"

Bun.serve({
	routes: {
		"/": homepage,
	},
	development: true,
})
