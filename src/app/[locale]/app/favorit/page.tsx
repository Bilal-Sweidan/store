"use client"
import { useState } from "react";
import MainHeader from "@/components/public/layout/headers/MainHeader";

export default function FavoriteOrdersPage() {
    const [selected, setSelected] = useState([]);

    const favorites = [
        { id: 1, name: "iPhone 15 Pro Max", price: 1099, date: "Mar 1, 2026", status: "In Stock" },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: 999, date: "Feb 25, 2026", status: "Limited" },
        { id: 3, name: "Google Pixel 8 Pro", price: 899, date: "Feb 20, 2026", status: "Out" },
    ];

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const totalValue = favorites
        .filter((item) => selected.includes(item.id))
        .reduce((acc, item) => acc + item.price, 0);

    return (
        <main className="bg-neutral-50 min-h-screen pb-24">
            <MainHeader />

            {/* Mobile Friendly Header */}
            <section className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-neutral-200">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-neutral-900">
                            Favorites
                        </h1>
                        <p className="text-xs text-neutral-500">
                            Manage your saved products
                        </p>
                    </div>
                    {selected.length > 0 && (
                        <button className="bg-neutral-900 text-white text-xs px-4 py-2 rounded-full">
                            Add ({selected.length})
                        </button>
                    )}
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Favorites List */}
                <div className="lg:col-span-3 space-y-4">
                    {favorites.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-2xl p-5 border transition-all duration-200 ${selected.includes(item.id)
                                ? "border-neutral-900 shadow-md"
                                : "border-neutral-200"
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(item.id)}
                                        onChange={() => toggleSelect(item.id)}
                                        className="mt-1 w-4 h-4 accent-neutral-900"
                                    />

                                    <div className="w-16 h-16 bg-neutral-100 rounded-xl" />

                                    <div>
                                        <h3 className="font-medium text-neutral-900">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-neutral-500 mt-1">
                                            Saved on {item.date}
                                        </p>
                                        <span
                                            className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${item.status === "In Stock"
                                                ? "bg-emerald-100 text-emerald-600"
                                                : item.status === "Limited"
                                                    ? "bg-amber-100 text-amber-600"
                                                    : "bg-neutral-200 text-neutral-600"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-neutral-900">
                                        ${item.price}
                                    </p>
                                    <button className="mt-3 text-xs text-neutral-500 hover:text-neutral-900 transition">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sticky Summary Card */}
                <aside className="lg:block">
                    <div className="bg-white rounded-2xl border border-neutral-200 p-6 sticky top-24">
                        <h2 className="text-sm font-semibold text-neutral-800 mb-4">
                            Summary
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-neutral-600">
                                <span>Selected</span>
                                <span>{selected.length}</span>
                            </div>
                            <div className="flex justify-between font-medium text-neutral-900">
                                <span>Total</span>
                                <span>${totalValue}</span>
                            </div>
                        </div>

                        <button
                            disabled={selected.length === 0}
                            className="mt-6 w-full bg-neutral-900 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Checkout
                        </button>
                    </div>
                </aside>
            </div>
        </main>
    );
}
