import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppBindings } from "@/types";

export const createRouter = () => {
	const router = new OpenAPIHono<AppBindings>({ strict: false });
	return router;
};
