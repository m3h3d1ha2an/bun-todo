import { createRoute, z } from "@hono/zod-openapi";
import { auth } from "@/auth";
import { createRouter } from "@/utils/create-router";

export const router = createRouter();

router.openapi(
	createRoute({
		method: "get",
		path: "/",
		responses: {
			200: {
				content: {
					"application/json": {
						schema: z.object({
							message: z.string(),
						}),
					},
				},
				description: "Bun Todo API",
			},
		},
	}),
	(c) => {
		return c.json({
			message: "This is a todo crud application in bun runtime.",
		});
	},
);

router.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

const moduleRoutes = [{}];

moduleRoutes.forEach((route) => {
	router.route(route.path, route.router);
});
