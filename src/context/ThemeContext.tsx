"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "app-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("system");
    const [mounted, setMounted] = useState(false);

    // Load theme from localStorage (client only)
    useEffect(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
        if (storedTheme) {
            setTheme(storedTheme);
        }
        setMounted(true);
    }, []);

    // Apply theme + save to localStorage
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else if (theme === "light") {
            root.classList.remove("dark");
        } else {
            // system
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.toggle("dark", isDark);
        }

        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme, mounted]);

    // Prevent hydration mismatch
    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}
