"use client"
import { useState } from "react";
import MainHeader from "@/components/public/layout/headers/MainHeader";

export default function CartPage() {
    const [cart, setCart] = useState([
        { id: 1, name: "iPhone 15 Pro Max", price: 1099, qty: 1 },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: 999, qty: 2 },
    ]);

    const updateQty = (id, type) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        qty:
                            type === "inc"
                                ? item.qty + 1
                                : item.qty > 1
                                    ? item.qty - 1
                                    : 1,
                    }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 20 : 0;
    const total = subtotal + shipping;

    return (
        <main className="bg-neutral-50 min-h-screen pb-28">
            <MainHeader />

            {/* Sticky Header */}
            <section className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-neutral-200">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <h1 className="text-xl md:text-2xl font-semibold text-neutral-900">
                        Shopping Cart
                    </h1>
                    <p className="text-xs text-neutral-500">
                        Review your items before checkout
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-3 space-y-4">
                    {cart.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-neutral-200 p-10 text-center">
                            <h2 className="text-lg font-medium text-neutral-800">
                                Your cart is empty 🛒
                            </h2>
                            <p className="text-sm text-neutral-500 mt-2">
                                Add some products to get started.
                            </p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-neutral-200 p-5"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 bg-neutral-100 rounded-xl" />

                                        <div>
                                            <h3 className="font-medium text-neutral-900">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-neutral-500 mt-1">
                                                ${item.price} each
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 mt-4">
                                                <button
                                                    onClick={() => updateQty(item.id, "dec")}
                                                    className="w-8 h-8 rounded-lg border border-neutral-300 text-neutral-700"
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm font-medium w-6 text-center">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    onClick={() => updateQty(item.id, "inc")}
                                                    className="w-8 h-8 rounded-lg border border-neutral-300 text-neutral-700"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold text-neutral-900">
                                            ${item.price * item.qty}
                                        </p>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-xs text-neutral-500 hover:text-neutral-900 mt-3"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order Summary */}
                <aside className="lg:block">
                    <div className="bg-white rounded-2xl border border-neutral-200 p-6 sticky top-24">
                        <h2 className="text-sm font-semibold text-neutral-800 mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-neutral-600">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between text-neutral-600">
                                <span>Shipping</span>
                                <span>${shipping}</span>
                            </div>
                            <div className="border-t border-neutral-200 pt-3 flex justify-between font-semibold text-neutral-900">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        <button
                            disabled={cart.length === 0}
                            className="mt-6 w-full bg-neutral-900 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </aside>
            </div>
        </main>
    );
}
