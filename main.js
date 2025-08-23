import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { renderFile } from "pug";

const app = new Hono();

app.use("*", (c, next) => {
	c.setRenderer(
		(template, ...data) => c.html(renderFile(`routes/${template}.pug`, ...data)),
	);
	next();
});

app.use("*", serveState({ root: "./assets/dist" }));

app.get("/", c => c.render("home"));

export default app;
