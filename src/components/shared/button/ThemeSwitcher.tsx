'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md border px-3 py-2 text-sm
                 dark:bg-zinc-800 dark:text-white"
        >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
    );
}
