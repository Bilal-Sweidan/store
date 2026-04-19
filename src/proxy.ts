import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { authConfig } from "@/auth.config";
import { routing } from "@/i18n/routing";
import {
    defaultHomeForRole,
    getLocaleFromPathname,
    isAuthPage,
    matchRoleRule,
    stripLocaleFromPathname,
} from "@/lib/route-access";

const intlMiddleware = createMiddleware(routing);

function loginUrl(req: NextRequest, locale: string, pathname: string) {
    const url = new URL(`/${locale}/client/auth/login`, req.url);
    url.searchParams.set("callbackUrl", pathname);
    return url;
}

export default NextAuth(authConfig).auth((req) => {
    const { pathname } = req.nextUrl;
    const locale = getLocaleFromPathname(pathname, routing.defaultLocale);
    const cleanPath = stripLocaleFromPathname(pathname);

    const session = req.auth;
    const isLoggedIn = !!session?.user;
    const roleName = session?.user?.role ?? null;

    if (isAuthPage(cleanPath)) {
        if (isLoggedIn) {
            const home = defaultHomeForRole(roleName);
            return NextResponse.redirect(new URL(`/${locale}${home}`, req.url));
        }
        return intlMiddleware(req);
    }

    const rule = matchRoleRule(cleanPath);
    if (!rule) {
        return intlMiddleware(req);
    }

    if (!isLoggedIn) {
        return NextResponse.redirect(loginUrl(req, locale, pathname));
    }

    if (!roleName || !rule.roles.includes(roleName)) {
        const safe = defaultHomeForRole(roleName);
        const url = new URL(`/${locale}${safe}`, req.url);
        url.searchParams.set("error", "forbidden");
        return NextResponse.redirect(url);
    }

    return intlMiddleware(req);
});

export const config = {
    matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};