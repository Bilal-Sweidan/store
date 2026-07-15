'use client';

import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher({ ...props }) {
    const { theme, setTheme } = useTheme();
    return (
        <div {...props} className='flex items-center'>
            {
                theme === "dark" ?
                    <SunMedium onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`hover:cursor-pointer`} />
                    :
                    <Moon onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`hover:cursor-pointer`} />
            }
        </div>
    );
}
