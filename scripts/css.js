import { transform } from "npm:lightningcss";

const {code, map} = transform({
	filename: "main.css",
	code: await Deno.readFile("./assets/src/main.css"),
});

await Deno.writeFile("./assets/dist/main.css", code, { create: true });
