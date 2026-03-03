import Header from "@/components/admin/layout/Header";
import Sidebar from "@/components/admin/layout/Sidebar";


export default function DashboardLayout({children} : {children: React.ReactNode}){
    return(
        <main className="flex w-full">
            <Sidebar />
            <div className="w-full block">
                <Header />
                {children}
            </div>
        </main>
    )
}