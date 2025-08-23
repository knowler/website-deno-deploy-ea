import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { renderFile } from "pug";

const app = new Hono();

app.use("*", async (c, next) => {
	c.setRenderer((template, data = {}) =>
		c.html(
			renderFile(`routes/${template}.pug`, {
				basedir: "./routes",
				...data
			}),
		),
	);
	await next();
});

app.get("/", c => c.render("home"));

app.use("*", serveStatic({ root: "./assets/dist/" }));

export default app;
