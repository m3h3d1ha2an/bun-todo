import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { env } from "@/env";
import { httpStatus } from "@/utils/http-status";
import { sendResponse } from "@/utils/send-response";

export const onError: ErrorHandler = (error, c) => {
	const rawStatus =
		"status" in error ? (error.status as number) : c.newResponse(null).status;

	const statusCode: ContentfulStatusCode =
		rawStatus >= 400 && rawStatus < 600
			? (rawStatus as ContentfulStatusCode)
			: httpStatus.INTERNAL_SERVER_ERROR.code;

	const currentEnv = (c.env?.NODE_ENV as string) || env.NODE_ENV;

	return sendResponse({
		c,
		statusCode,
		success: false,
		message: error.message || httpStatus.INTERNAL_SERVER_ERROR.message,
		stack: currentEnv === "production" ? undefined : error.stack,
	});
};
