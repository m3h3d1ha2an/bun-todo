import type { MiddlewareHandler } from "hono";

export const favicon =
	(emoji: string): MiddlewareHandler =>
	async (c, next) => {
		if (c.req.path === "/favicon.ico") {
			// Check if we are in development mode
			const isDev = process.env.NODE_ENV !== "production";

			if (isDev) {
				// Disable caching completely during development
				c.header("Cache-Control", "no-store, no-cache, must-revalidate");
			} else {
				// Enable long-term caching for production performance
				c.header("Cache-Control", "public, max-age=86400");
			}

			c.header("Content-Type", "image/svg+xml");

			return c.body(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`,
			);
		}
		await next();
	};
