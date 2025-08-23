import { Hono } from "hono";
import { serveStatic } from "hono/deno";

import { pugRenderer } from "./middleware/pug-renderer.js";

const app = new Hono();

app.use("*", pugRenderer());

app.get("/", c => c.render("home"));

app.use("*", serveStatic({ root: "./assets/dist/" }));

export default app;
