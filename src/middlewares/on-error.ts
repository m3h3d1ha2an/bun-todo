import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { env } from "@/env";
import { httpStatus, httpStatusMessage } from "@/utils/http-status";
import { sendResponse } from "@/utils/send-response";

export const onError: ErrorHandler = (error, context) => {
	const rawStatus =
		"status" in error
			? (error.status as number)
			: context.newResponse(null).status;

	const statusCode: ContentfulStatusCode =
		rawStatus >= 400 && rawStatus < 600
			? (rawStatus as ContentfulStatusCode)
			: httpStatus.INTERNAL_SERVER_ERROR;

	const currentEnv = (context.env?.NODE_ENV as string) || env.NODE_ENV;

	return sendResponse(context, {
		statusCode,
		success: false,
		message: error.message || httpStatusMessage.INTERNAL_SERVER_ERROR,
		stack: currentEnv === "production" ? undefined : error.stack,
	});
};
