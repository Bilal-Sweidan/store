import MainHeader from "@/components/public/layout/headers/MainHeader";

export default async function CategoryPage() {
    const products = [
        { id: 1, name: "iPhone 15 Pro Max", price: "$1099", oldPrice: "$1199" },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: "$999", oldPrice: "$1099" },
        { id: 3, name: "Google Pixel 8 Pro", price: "$899", oldPrice: "$999" },
        { id: 4, name: "OnePlus 12 Pro Edition", price: "$799", oldPrice: "$899" },
        { id: 5, name: "Xiaomi 14 Ultra", price: "$749", oldPrice: "$849" },
        { id: 6, name: "Nothing Phone 2", price: "$599", oldPrice: "$699" },
    ];

    return (
        <main className="bg-gray-50 min-h-screen pb-16">
            <MainHeader />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Smartphones</h1>
                    <p className="text-lg text-indigo-100 max-w-2xl">
                        Discover the latest and most powerful smartphones with the best
                        prices and exclusive offers.
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Filters Sidebar */}
                <aside className="bg-white rounded-2xl shadow-sm p-6 h-fit">
                    <h2 className="text-lg font-semibold mb-6">Filters</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-600 mb-2">Brand</h3>
                            <div className="space-y-2">
                                {["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"].map(
                                    (brand) => (
                                        <label
                                            key={brand}
                                            className="flex items-center gap-2 text-sm text-gray-700"
                                        >
                                            <input type="checkbox" className="rounded" />
                                            {brand}
                                        </label>
                                    )
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-600 mb-2">Price</h3>
                            <input
                                type="range"
                                min="100"
                                max="1500"
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>$100</span>
                                <span>$1500</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <section className="lg:col-span-3">
                    {/* Top Bar */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                        <p className="text-gray-600 text-sm">
                            Showing {products.length} products
                        </p>
                        <select className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Sort by Latest</option>
                            <option>Sort by Price: Low to High</option>
                            <option>Sort by Price: High to Low</option>
                        </select>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group"
                            >
                                {/* Image Placeholder */}
                                <div className="h-52 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                    Product Image
                                </div>

                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition mb-2">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-lg font-bold text-indigo-600">
                                            {product.price}
                                        </span>
                                        <span className="text-sm text-gray-400 line-through">
                                            {product.oldPrice}
                                        </span>
                                    </div>

                                    <button className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
