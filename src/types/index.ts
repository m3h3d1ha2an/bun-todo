import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger as HonoPinoLogger } from "hono-pino";
import type { BetterAuth } from "@/auth";

export type AppVariables = {
	logger: HonoPinoLogger;
	user: BetterAuth["user"] | null;
	session: BetterAuth["session"] | null;
};

export type AppBindings = {
	Variables: AppVariables;
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;
