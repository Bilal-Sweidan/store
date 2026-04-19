import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Role from "@/models/Role";
import type { Session } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

async function getRoleName(session: Session | null): Promise<string | undefined> {
    if (session?.user?.role) {
        return session.user.role;
    }
    // const roleId = session?.user?.role;
    // if (!roleId) return undefined;

    // await connectToDatabase();
    const role = session?.user.role
    return role?.toLowerCase();
}

/**
 * Wrap an App Router route handler (e.g. `app/api/<segment>/route.ts`) and allow
 * access only when the current user is authenticated and has role "admin".
 */
export function withAdmin<TContext = Record<string, unknown>, TReturn extends Response = Response>(
    handler: (req: NextRequest, ctx: TContext) => TReturn | Promise<TReturn>) {
    return async (req: NextRequest, ctx: TContext) => {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const roleName = await getRoleName(session);
        if (roleName !== "admin") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        return handler(req, ctx);
    };
}

/**
 * Convenience helper when you just need the admin session (or a Response).
 */
export async function requireAdmin() {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false as const,
            response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
        };
    }

    const roleName = await getRoleName(session);
    if (roleName !== "admin") {
        return {
            ok: false as const,
            response: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
        };
    }

    return { ok: true as const, session };
}

