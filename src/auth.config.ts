import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// ✅ No Mongoose here — Edge Runtime safe
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/client/auth/login",
    },

    callbacks: {
        // Route + role checks run in `src/proxy.ts` (Edge-safe, uses JWT `roleName`).
        authorized() {
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                const u = user as {
                    id: string;
                    role?: string;
                    roleName?: string | null;
                };
                token.id = u.id;
                token.role = u.role;
                token.roleName = u.roleName ?? null;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string | undefined;
                session.user.roleName =
                    (token.roleName as string | null | undefined) ?? null;
            }
            return session;
        },
    },

    providers: [], // ✅ providers added in auth.ts
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
};