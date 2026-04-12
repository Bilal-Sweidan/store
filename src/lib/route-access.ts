/**
 * Pathnames here are WITHOUT locale prefix (e.g. "/dashboard", "/client/cart").
 * Role names must match `Role.name` in the database (lowercase).
 */
export const ROLE_ROUTE_RULES: { prefix: string; roles: string[] }[] = [
  { prefix: "/dashboard", roles: ["admin"] },
  { prefix: "/supplier", roles: ["supplier", "resource"] },
  { prefix: "/client/setting", roles: ["client"] },
  { prefix: "/client/favorit", roles: ["client"] },
  { prefix: "/client/cart", roles: ["client"] },
];

const AUTH_PAGES = ["/client/auth/login", "/client/auth/register"];

export function stripLocaleFromPathname(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?(?=\/|$)/, "") || "/";
}

export function getLocaleFromPathname(pathname: string, defaultLocale: string): string {
  const m = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)/);
  return m?.[1] ?? defaultLocale;
}

export function matchRoleRule(cleanPath: string): { roles: string[] } | null {
  const sorted = [...ROLE_ROUTE_RULES].sort((a, b) => b.prefix.length - a.prefix.length);
  for (const rule of sorted) {
    if (cleanPath === rule.prefix || cleanPath.startsWith(`${rule.prefix}/`)) {
      return { roles: rule.roles };
    }
  }
  return null;
}

export function isAuthPage(cleanPath: string): boolean {
  return AUTH_PAGES.some((p) => cleanPath === p || cleanPath.startsWith(`${p}/`));
}

export function defaultHomeForRole(roleName: string | null | undefined): string {
  switch (roleName) {
    case "admin":
      return "/dashboard";
    case "supplier":
    case "resource":
      return "/supplier";
    case "client":
    default:
      return "/client";
  }
}
