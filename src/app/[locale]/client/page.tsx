import MainHeader from "@/components/public/layout/headers/MainHeader";

export default async function Home() {
    const categories = [
        { name: "Phones", icon: "📱" },
        { name: "Laptops", icon: "💻" },
        { name: "TVs", icon: "📺" },
        { name: "Gaming", icon: "🎮" },
        { name: "Audio", icon: "🎧" },
    ];

    const featuredProducts = [
        { name: "iPhone 15 Pro", price: "$999" },
        { name: "MacBook Air M3", price: "$1299" },
        { name: "Sony WH-1000XM5", price: "$399" },
        { name: "PlayStation 5", price: "$499" },
    ];

    const flashDeals = [
        { name: "Samsung Galaxy S24", price: "$899", discount: "10%" },
        { name: "Google Pixel 8", price: "$799", discount: "15%" },
    ];

    const brands = ["Apple", "Samsung", "Sony", "Dell", "HP"];

    return (
        <main className="bg-main min-h-screen pb-20">
            <div className="mx-auto max-w-md">
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

                {/* 📂 Categories Scroll */}
                <section className="px-4 mt-6">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-primary">Shop by category</h2>
                        <button className="text-[11px] text-secondary">View all</button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                className="group min-w-[90px] rounded-2xl bg-card px-3 py-3 text-center shadow-sm ring-1 ring-gray-200/70 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-indigo-200"
                            >
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-xl group-hover:bg-indigo-100">
                                    {cat.icon}
                                </div>
                                <p className="mt-2 text-xs font-medium text-primary">{cat.name}</p>
                                <p className="mt-0.5 text-[10px] text-secondary">124 items</p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* ⚡ Flash Deals */}
                <section className="px-4 mt-7">
                    <div className="mb-3 flex items-baseline justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-primary">Flash deals</h2>
                            <p className="text-[11px] text-secondary">Limited time offers just for today</p>
                        </div>
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                            ⏰ 02:15:32
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {flashDeals.map((product) => (
                            <article
                                key={product.name}
                                className="relative overflow-hidden rounded-2xl bg-card p-3 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                                    {product.discount} OFF
                                </span>
                                <button className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-xs text-gray-500 shadow-sm hover:text-red-500">
                                    ♡
                                </button>
                                <div className="mb-2 flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                                    <span className="text-xs text-gray-400">Product image</span>
                                </div>
                                <h3 className="line-clamp-2 text-[11px] font-medium text-primary">
                                    {product.name}
                                </h3>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-xs font-bold text-indigo-600">{product.price}</span>
                                    <button className="rounded-full bg-indigo-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-indigo-700">
                                        Add
                                    </button>
                                </div>
                            </article>
                        ))}
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
                    <div className="grid grid-cols-2 gap-3">
                        {featuredProducts.map((product, index) => (
                            <article
                                key={product.name}
                                className="overflow-hidden rounded-2xl bg-card p-3 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="mb-2 h-24 rounded-xl bg-gray-100">
                                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                        Image {index + 1}
                                    </div>
                                </div>
                                <h3 className="line-clamp-2 text-[11px] font-medium text-primary">
                                    {product.name}
                                </h3>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-xs font-bold text-indigo-600">{product.price}</span>
                                    <span className="text-[10px] text-secondary">Free delivery</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 🏷 Brand Showcase / CTA
                <section className="px-4 mt-8 pb-24">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-primary">Top brands</h2>
                        <button className="text-[11px] text-secondary">Explore</button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                        {brands.map((brand) => (
                            <div
                                key={brand}
                                className="min-w-[110px] rounded-2xl bg-card px-4 py-3 text-center text-xs font-semibold text-primary shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                                {brand}
                            </div>
                        ))}
                    </div>
                </section> */}
            </div>
        </main>
    );
}
