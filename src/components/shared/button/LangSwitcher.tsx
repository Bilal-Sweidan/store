'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const switchLanguage = () => {
        let newLocale
        if (locale == "en") {
            newLocale = 'ar'
        } else {
            newLocale = 'en'
        }

        // replace the locale in the path
        const segments = pathname.split('/');
        segments[1] = newLocale; // first segment after '/' is locale
        const newPathname = segments.join('/');
        router.push(newPathname);
    };

    return (
        <div>
            <button
                onClick={() => switchLanguage()}
            >
                {
                    locale == "en" ? "العربية" : "English"
                }
            </button>
        </div>
    );
}
