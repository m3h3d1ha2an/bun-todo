import type { AppOpenAPI } from "@/types";
import packageJSON from "../../package.json";

export const OpenAPIConfig = (app: AppOpenAPI) => {
	app.doc("/doc", {
		openapi: "3.2.0",
		info: {
			version: packageJSON.version,
			title: "Bun Todo API",
		},
	});
};
