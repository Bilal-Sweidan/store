'use client';

import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    return (
        <>
            {
                theme === "dark" ?
                    <SunMedium onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='hover:cursor-pointer' />
                    :
                    <Moon onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='hover:cursor-pointer' />
            }
        </>
    );
}
