import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

type ApiResponse<T> = {
	success: boolean;
	message: string;
	data?: T | null;
	stack?: string;
};

type SendResponseArgs<T> = {
	c: Context;
	statusCode: ContentfulStatusCode;
} & ApiResponse<T>;

export const sendResponse = <T>({
	c,
	statusCode,
	success,
	message,
	data,
	stack,
}: SendResponseArgs<T>) => {
	return c.json(
		{
			success,
			message,
			data: data ?? null,
			stack,
		} satisfies ApiResponse<T>,
		statusCode,
	);
};
