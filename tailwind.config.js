module.exports = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",   // Next.js App Router
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    main: "var(--bg-main)",
                    card: "var(--bg-card)",
                    header: "var(--header-bg)",
                },
                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                },
                primary: "var(--primary)",
            },
        },
    },
};
