import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import type { AuthSession, AuthUser } from "./auth";

export type AppVariables = {
	logger: PinoLogger;
	user: AuthUser | null;
	session: AuthSession | null;
};

export type AppBindings = {
	Variables: AppVariables;
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;
