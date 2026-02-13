import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.url(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_BASE_URL: z.url(),
	PORT: z.coerce.number(),
	NODE_ENV: z.enum(["development", "production", "test"]),
	LOG_LEVEL: z.enum([
		"fatal",
		"error",
		"warn",
		"info",
		"debug",
		"trace",
		"silent",
	]),
});

const validateEnv = () => {
	const parsed = envSchema.safeParse(process.env);
	if (!parsed.success) {
		console.error("❌ Invalid environment variables:");
		console.error(JSON.stringify(z.treeifyError(parsed.error), null, 2));
		process.exit(1);
	}
	return parsed.data;
};

export const env = validateEnv();
