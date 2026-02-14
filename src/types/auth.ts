import type { auth } from "@/auth";

type BetterAuthSession = typeof auth.$Infer.Session;
export type AuthSession = BetterAuthSession["session"];
export type AuthUser = BetterAuthSession["user"];
