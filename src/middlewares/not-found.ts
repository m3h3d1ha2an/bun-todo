import type { NotFoundHandler } from "hono";
import { httpStatus } from "@/utils/http-status";
import { sendResponse } from "@/utils/send-response";

export const notFound: NotFoundHandler = (c) => {
	return sendResponse({
		c,
		statusCode: httpStatus.NOT_FOUND.code,
		success: false,
		message: `${httpStatus.NOT_FOUND.message} - ${c.req.path}`,
	});
};
