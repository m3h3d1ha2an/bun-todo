import type { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * Custom application error class to handle operational and programming errors.
 * * @extends Error
 * @param {ContentfulStatusCode} code - The HTTP status code (e.g., 400, 404, 500).
 * @param {string} [message="An unexpected error occurred"] - The error message.
 * @param {boolean} [isOperational=true] - Indicates if the error is a known/trusted operational error.
 * @param {string} [stack] - Optional custom stack trace.
 */
export class AppError extends Error {
	constructor(
		public readonly code: ContentfulStatusCode,
		message: string = "An unexpected error occurred",
		public readonly isOperational = true,
		stack?: string,
	) {
		super(message);
		this.name = this.constructor.name;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
