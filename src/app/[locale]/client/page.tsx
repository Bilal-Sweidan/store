"use client"
import Image from "next/image";
import Link from "next/link";
// next-intl
import { useLocale } from "next-intl";
// components
import MainHeader from "@/components/public/layout/headers/MainHeader";

export default function Home() {
    const local = useLocale()

    const featuredProducts = [
        { _id: 1, name: "power plus", describe: "SolarPower Europe is the award-winning link between policymakers and the solar PV value chain. Get to know the SolarPower Europe team working to transform ", price: "$999", image: "https://powerplus-eg.com/wp-content/uploads/2025/07/Untitled-design.webp" },
        { _id: 2, name: "MacBook Air M3", describe: "SolarPower Europe is the award-winning link between policymakers and the solar PV value chain. Get to know the SolarPower Europe team working to transform ", price: "$1299", image: "https://5.imimg.com/data5/LH/DJ/MB/SELLER-3379571/wires-and-cabels.JPG" },
        { _id: 3, name: "PlayStation 5", describe: "SolarPower Europe is the award-winning link between policymakers and the solar PV value chain. Get to know the SolarPower Europe team working to transform ", price: "$499", image: "https://5.imimg.com/data5/LH/DJ/MB/SELLER-3379571/wires-and-cabels.JPG" },
        { _id: 4, name: "Sony WH-1000XM5", describe: "SolarPower Europe is the award-winning link between policymakers and the solar PV value chain. Get to know the SolarPower Europe team working to transform ", price: "$399", image: "https://powerplus-eg.com/wp-content/uploads/2025/07/Untitled-design.webp" },
    ];

    const flashDeals = [
        { name: "Samsung Galaxy S24", price: "$899", discount: "10%", image: "https://powerplus-eg.com/wp-content/uploads/2025/07/Untitled-design.webp" },
        { name: "Google Pixel 8", price: "$799", discount: "15%", image: "https://5.imimg.com/data5/LH/DJ/MB/SELLER-3379571/wires-and-cabels.JPG" },
    ];


    return (
        <main className="bg-main w-full min-h-full pb-20">
            <div className="mx-auto max-w-5xl">
                {/* 🔝 Header */}
                <MainHeader />

                {/* 🚀 Hero / Stats / Search */}
                <section className="px-4 pt-4 space-y-4">
                    {/* Gradient hero card */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-5 text-white shadow-xl">
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-indigo-400/30 blur-2xl" />

                        <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Weekend sale</p>
                        <h1 className="mt-1 text-2xl font-semibold leading-tight">
                            Upgrade your <span className="font-bold">tech</span> today
                        </h1>
                        <p className="mt-2 text-xs text-indigo-100/90">
                            Exclusive offers on smartphones, laptops, gaming & accessories.
                        </p>

                        <div className="mt-4 flex items-center gap-3 text-[11px]">
                            <div className="flex flex-1 items-center gap-2 rounded-2xl bg-black/20 px-3 py-2 backdrop-blur-sm">
                                <div className="h-8 w-8 rounded-xl bg-white/10" />
                                <div>
                                    <p className="font-medium leading-tight">Up to 40% OFF</p>
                                    <p className="text-[10px] text-indigo-100/80">On selected electronics</p>
                                </div>
                            </div>
                            <button className="rounded-2xl bg-white px-4 py-2 text-[11px] font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50">
                                Shop now
                            </button>
                        </div>
                    </div>

                    {/* Search + quick filters */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-sm">
                            <span className="text-gray-400 text-sm">🔍</span>
                            <input
                                placeholder="Search products, brands, categories"
                                className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
                            />
                            <button className="rounded-xl bg-indigo-600 px-2.5 py-1 text-[10px] font-semibold text-white">
                                Search
                            </button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 text-[11px]">
                            {["Best sellers", "New arrivals", "Under $500", "For gamers"].map((chip) => (
                                <button
                                    key={chip}
                                    className="whitespace-nowrap rounded-2xl bg-card px-3 py-1 text-gray-600 shadow-sm hover:bg-indigo-50 hover:text-indigo-700"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 🛍 Featured Products */}
                <section className="px-4 mt-7">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-primary">Featured products</h2>
                        <button className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700">
                            See all
                        </button>
                    </div>
                    <div className="columns-2 gap-3 space-y-3">
                        {featuredProducts.map((product) => (
                            <Link
                                href={`/${local}/client/product/${product._id}`}
                                key={product.name}
                                className="break-inside-avoid overflow-hidden rounded-2xl bg-card p-3 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md hover:cursor-pointer"
                            >
                                <div className="mb-2 overflow-hidden rounded-xl bg-gray-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={0}
                                        height={0}
                                        sizes="50vw"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <h3 className="line-clamp-2 text-[11px] font-medium text-primary capitalize text-lg">
                                    {product.name}
                                </h3>
                                <div>
                                    <span className="text-xs">{product.describe}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-xs font-bold text-indigo-600">{product.price}</span>
                                    <span className="text-[10px] text-secondary">Free delivery</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}