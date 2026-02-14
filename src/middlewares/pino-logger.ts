import { pinoLogger as honoPino } from "hono-pino";
import { pino } from "pino";
import pretty from "pino-pretty";
import { env } from "@/env";

export const pinoLogger = () =>
	honoPino({
		pino: pino(
			{ level: env.LOG_LEVEL || "info" },
			env.NODE_ENV === "production" ? undefined : pretty(),
		),
	});
