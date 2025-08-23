import { renderFile } from "pug";

export function pugRenderer() {
	return async (c, next) => {
		c.setRenderer((template, data = {}) =>
			c.html(
				renderFile(`routes/${template}.pug`, {
					basedir: "./routes",
					...data
				}),
			),
		);
		await next();
	}
}
