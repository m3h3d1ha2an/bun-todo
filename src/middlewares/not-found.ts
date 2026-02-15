import type { NotFoundHandler } from "hono";
import { httpStatus, httpStatusMessage } from "@/utils/http-status";
import { sendResponse } from "@/utils/send-response";

export const notFound: NotFoundHandler = (context) => {
	return sendResponse(context, {
		statusCode: httpStatus.NOT_FOUND,
		success: false,
		message: `${httpStatusMessage.NOT_FOUND} - ${context.req.path}`,
	});
};
