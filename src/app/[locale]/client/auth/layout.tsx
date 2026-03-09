import MainHeader from "@/components/public/layout/headers/MainHeader";


export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="">
            <MainHeader />
            {children}
        </main>
    )
}