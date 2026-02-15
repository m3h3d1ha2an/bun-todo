import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { env } from "@/env";
import { httpStatus } from "./http-status";

export type ApiResponse<T> = {
	success: boolean;
	message: string;
	data?: T | null;
	stack?: string;
};

type ResponseOptions<T> = {
	statusCode?: ContentfulStatusCode;
	message: string;
} & Partial<ApiResponse<T>>;


export const sendResponse = <T>(
	context: Context,
	options: ResponseOptions<T>,
) => {
	const { statusCode, stack, data, success, message } = options;

	const payload: ApiResponse<T> = {
		success: success ?? true,
		message,
		data: data ?? null,
		...(env.NODE_ENV !== "production" && stack && { stack }),
	};

	return context.json(payload, statusCode ?? httpStatus.OK);
};
