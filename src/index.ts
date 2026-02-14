import { createApp } from "@/utils/create-app";
import { OpenAPIConfig } from "@/utils/openapi-config";

const app = createApp();

OpenAPIConfig(app);

app.get("/", (c) => {
	return c.json({
		name: "Bun Todo API",
		desc: "This is a todo crud application in bun runtime.",
	});
});

app.get("/error", () => {
	throw new Error("This is a test error");
});

export default app;
