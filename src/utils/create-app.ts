import { requestId } from "hono/request-id";
import { favicon } from "@/middlewares/favicon";
import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";
import { createRouter } from "@/utils/create-router";

export const createApp = () => {
	const app = createRouter();
	app.use("*", requestId());
	app.use("*", favicon("📓"));
	app.use("*", pinoLogger());
	app.notFound(notFound);
	app.onError(onError);
	return app;
};
