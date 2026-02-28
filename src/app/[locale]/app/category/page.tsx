import MainHeader from "@/components/public/layout/headers/MainHeader";

export default async function CategoryPage() {
    const products = [
        { id: 1, name: "iPhone 15 Pro Max", price: "$1099", oldPrice: "$1199" },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: "$999", oldPrice: "$1099" },
        { id: 3, name: "Google Pixel 8 Pro", price: "$899", oldPrice: "$999" },
        { id: 4, name: "OnePlus 12 Pro Edition", price: "$799", oldPrice: "$899" },
    ];

    return (
        <main className="bg-gray-50 min-h-screen pb-10">

            <MainHeader />

            {/* 🟣 Category Header */}
            <section className="px-4 pt-6">
                <h1 className="text-2xl font-bold">Smartphones</h1>
                <p className="text-sm text-gray-500 mt-1">
                    124 products available
                </p>
            </section>

            {/* 🔥 Sticky Filter Bar */}
            <section className="sticky top-[56px] z-40 bg-gray-50 px-4 pt-4 pb-3">
                <div className="flex gap-3 overflow-x-auto pb-1">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
                        Popular
                    </button>

                    <button className="bg-white px-4 py-2 rounded-full text-sm shadow-sm whitespace-nowrap">
                        Price
                    </button>

                    <button className="bg-white px-4 py-2 rounded-full text-sm shadow-sm whitespace-nowrap">
                        Rating 4+
                    </button>

                    <button className="bg-white px-4 py-2 rounded-full text-sm shadow-sm whitespace-nowrap">
                        In Stock
                    </button>
                </div>
            </section>

            {/* 🛍 Product Grid */}
            <section className="px-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden group"
                        >
                            {/* Image Area */}
                            <div className="relative h-36 bg-gray-100">

                                {/* Discount Badge */}
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    -10%
                                </span>

                                {/* Wishlist */}
                                <button className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1 text-sm">
                                    🤍
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="p-3">
                                <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
                                    {product.name}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mt-1 text-xs text-yellow-500">
                                    ⭐⭐⭐⭐☆
                                    <span className="text-gray-500">(124)</span>
                                </div>

                                {/* Price */}
                                <div className="mt-2">
                                    <span className="text-indigo-600 font-bold text-sm">
                                        {product.price}
                                    </span>
                                    <span className="text-gray-400 text-xs line-through ml-2">
                                        {product.oldPrice}
                                    </span>
                                </div>

                                {/* Add Button */}
                                <button className="mt-3 w-full bg-indigo-600 text-white text-xs py-2 rounded-lg active:scale-95 transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </main>
    );
}
