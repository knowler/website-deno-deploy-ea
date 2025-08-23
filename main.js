import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { cache } from 'hono/cache'

import { pugRenderer } from "./middleware/pug-renderer.js";

console.log({
	deployment: Deno.env.get("DENO_DEPLOYMENT_ID"),
	revision: Deno.env.get("DENO_REVISION_ID"),
});

const app = new Hono();

app.use("*", pugRenderer());

app.get("*", cache({
	cacheName: "foo",
	cacheControl: "max-age=300",
	wait: true,
}));

app.get("/", c => c.render("home"));

app.use("*", serveStatic({ root: "./assets/dist/" }));

export default app;
