import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import type { PinoLogger } from "hono-pino";
import { auth } from "@/auth";
import { pinoLogger } from "@/middlewares/logger";
import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import { favicon } from "./middlewares/favicon";

type AppBindings = {
	Variables: {
		logger: PinoLogger;
	};
};
const app = new OpenAPIHono<AppBindings>();

app.use("*", requestId());
app.use("*", favicon("📓"));
app.use("*", pinoLogger());

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
	return c.json({
		name: "Bun Todo API",
		desc: "This is a todo crud application in bun runtime.",
	});
});

app.get("/error", () => {
	throw new Error("This is a test error");
});

app.notFound(notFound);
app.onError(onError);

export default app;
