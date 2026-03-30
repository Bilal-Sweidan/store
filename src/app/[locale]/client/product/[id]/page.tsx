"use client"

import Image from "next/image";
import { useState } from "react";

// ── mock product ──────────────────────────────────────────────────────────────
const product = {
    name: "SolarEdge Pro 40000",
    brand: "PowerPlus",
    price: 89,
    originalPrice: 129,
    rating: 4.7,
    reviews: 1380,
    stock: 12,
    description:
        "Charge anywhere the sun shines. The SolarEdge Pro packs a massive 40,000 mAh capacity with dual high-efficiency solar panels, fast-charging USB-C PD, and a rugged waterproof shell — perfect for hiking, camping, and off-grid adventures.",
    images: [
        "https://powerplus-eg.com/wp-content/uploads/2025/07/Untitled-design.webp"
    ],
    colors: [
        { label: "Midnight Black", value: "#1c1c1e" },
        { label: "Forest Green", value: "#3a6b4a" },
        { label: "Desert Orange", value: "#d4622a" },
        { label: "Arctic Grey", value: "#8e8e93" },
    ],
    capacity: ["10,000 mAh", "20,000 mAh", "40,000 mAh"],
    specs: [
        { icon: "☀️", label: "Solar", value: "5W Panel" },
        { icon: "⚡", label: "Output", value: "65W PD" },
        { icon: "🔋", label: "Capacity", value: "40,000 mAh" },
        { icon: "💧", label: "Rating", value: "IP67" },
    ],
    ports: [
        { icon: "🔌", label: "USB-C PD", value: "65W fast charge in & out" },
        { icon: "⚡", label: "USB-A × 2", value: "18W QC 3.0 each" },
        { icon: "🔦", label: "LED Torch", value: "3 modes: low / high / SOS" },
    ],
    inBox: ["SolarEdge Pro 40000", "USB-C to USB-C cable", "Carabiner clip", "Mesh carry pouch", "User manual"],
};

const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
);

export default function ProductDetails() {
    const [activeImage, setActiveImage] = useState(0);
    const [activeColor, setActiveColor] = useState(0);
    const [activeCapacity, setActiveCapacity] = useState(2);
    const [qty, setQty] = useState(1);
    const [wished, setWished] = useState(false);
    const [activeTab, setActiveTab] = useState<"about" | "ports" | "inbox">("about");

    return (
        <main className="bg-main min-h-screen w-full pb-32 select-none">
            <div className="mx-auto max-w-xl">

                {/* ── top bar ────────────────────────────────────────────── */}
                <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 backdrop-blur-md bg-main/80">
                    <button
                        onClick={() => history.back()}
                        className="flex h-9 w-9 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-gray-200/60 text-base"
                    >
                        ←
                    </button>
                    <span className="text-sm font-semibold text-primary">Product Details</span>
                    <button className="flex h-9 w-9 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-gray-200/60 text-base">
                        ⋯
                    </button>
                </header>

                {/* ── image gallery ──────────────────────────────────────── */}
                <section className="px-4 mt-1">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-green-100 shadow-md">
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
                            -{discount}%
                        </span>
                        <span className="absolute left-3 bottom-3 z-10 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
                            ☀️ Solar Ready
                        </span>
                        <button
                            onClick={() => setWished((w) => !w)}
                            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/90 shadow text-lg transition-transform active:scale-90"
                        >
                            {wished ? "❤️" : "🤍"}
                        </button>

                        <Image
                            src={product.images[activeImage]}
                            alt={product.name}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto max-h-72 object-contain p-6"
                        />
                    </div>

                    {/* thumbnails */}
                    <div className="mt-3 flex gap-2 justify-center">
                        {product.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`relative h-14 w-14 overflow-hidden rounded-2xl ring-2 transition-all ${activeImage === i
                                        ? "ring-emerald-500 scale-105 shadow-md"
                                        : "ring-gray-200/60 opacity-60"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt=""
                                    width={0}
                                    height={0}
                                    sizes="56px"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── name / rating ──────────────────────────────────────── */}
                <section className="px-4 mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
                        {product.brand}
                    </p>
                    <h1 className="mt-0.5 text-xl font-bold text-primary leading-snug">
                        {product.name}
                    </h1>
                    <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                            <span className="text-amber-400 text-xs">★</span>
                            <span className="text-xs font-bold text-amber-600">{product.rating}</span>
                        </div>
                        <span className="text-[11px] text-secondary">
                            {product.reviews.toLocaleString()} reviews
                        </span>
                        <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                            {product.stock} in stock
                        </span>
                    </div>
                </section>

                {/* ── price ──────────────────────────────────────────────── */}
                <section className="px-4 mt-4 flex items-end gap-3">
                    <span className="text-3xl font-extrabold text-emerald-600">${product.price}</span>
                    <span className="mb-1 text-sm text-secondary line-through">${product.originalPrice}</span>
                    <span className="mb-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500">
                        Save ${product.originalPrice - product.price}
                    </span>
                </section>

                {/* ── color picker ───────────────────────────────────────── */}
                <section className="px-4 mt-5">
                    <div className="flex items-center justify-between mb-2.5">
                        <p className="text-xs font-semibold text-primary">Color</p>
                        <p className="text-[11px] text-secondary">{product.colors[activeColor].label}</p>
                    </div>
                    <div className="flex gap-3">
                        {product.colors.map((c, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveColor(i)}
                                title={c.label}
                                style={{ backgroundColor: c.value }}
                                className={`h-7 w-7 rounded-full transition-transform active:scale-90 ${activeColor === i
                                        ? "ring-2 ring-offset-2 ring-emerald-500 scale-110"
                                        : "ring-1 ring-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </section>

                {/* ── capacity picker ────────────────────────────────────── */}
                <section className="px-4 mt-5">
                    <p className="text-xs font-semibold text-primary mb-2.5">Capacity</p>
                    <div className="flex gap-2">
                        {product.capacity.map((c, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCapacity(i)}
                                className={`rounded-2xl px-3 py-1.5 text-[11px] font-semibold transition-all ${activeCapacity === i
                                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                                        : "bg-card text-secondary ring-1 ring-gray-200"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── quick specs ────────────────────────────────────────── */}
                <section className="px-4 mt-5">
                    <div className="grid grid-cols-4 gap-2">
                        {product.specs.map((s) => (
                            <div
                                key={s.label}
                                className="flex flex-col items-center gap-1 rounded-2xl bg-card px-2 py-3 text-center shadow-sm ring-1 ring-gray-100"
                            >
                                <span className="text-lg">{s.icon}</span>
                                <span className="text-[10px] font-bold text-primary leading-tight">{s.value}</span>
                                <span className="text-[9px] text-secondary">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── solar charge estimate ──────────────────────────────── */}
                <section className="px-4 mt-5">
                    <div className="rounded-3xl bg-gradient-to-br from-amber-400 to-orange-400 p-4 text-white shadow-lg">
                        <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">
                            ☀️ Solar charge estimate
                        </p>
                        <p className="mt-1 text-2xl font-extrabold">~8 hrs full sun</p>
                        <p className="mt-0.5 text-[11px] opacity-80">
                            or plug in via USB-C 65W PD for a full charge in just 2.5 hrs
                        </p>
                        <div className="mt-3 h-2 w-full rounded-full bg-white/30">
                            <div className="h-2 w-3/4 rounded-full bg-white shadow-sm" />
                        </div>
                        <div className="mt-1 flex justify-between text-[10px] opacity-70">
                            <span>0%</span>
                            <span>Solar: 75% in 6 hrs</span>
                            <span>100%</span>
                        </div>
                    </div>
                </section>

                {/* ── tabs ───────────────────────────────────────────────── */}
                <section className="px-4 mt-5">
                    <div className="flex gap-1 rounded-2xl bg-card p-1 shadow-sm ring-1 ring-gray-100">
                        {(["about", "ports", "inbox"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 rounded-xl py-1.5 text-[11px] font-semibold capitalize transition-all ${activeTab === tab
                                        ? "bg-emerald-600 text-white shadow"
                                        : "text-secondary"
                                    }`}
                            >
                                {tab === "inbox" ? "In Box" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="mt-3">
                        {activeTab === "about" && (
                            <p className="text-[12px] leading-relaxed text-secondary">
                                {product.description}
                            </p>
                        )}
                        {activeTab === "ports" && (
                            <div className="space-y-2">
                                {product.ports.map((p) => (
                                    <div
                                        key={p.label}
                                        className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-gray-100"
                                    >
                                        <span className="text-xl">{p.icon}</span>
                                        <div>
                                            <p className="text-[11px] font-bold text-primary">{p.label}</p>
                                            <p className="text-[10px] text-secondary">{p.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === "inbox" && (
                            <div className="space-y-2">
                                {product.inBox.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-2.5 rounded-2xl bg-card px-3 py-2.5 shadow-sm ring-1 ring-gray-100"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                        <p className="text-[11px] font-medium text-primary">{item}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ── delivery info ──────────────────────────────────────── */}
                <section className="px-4 mt-5">
                    <div className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-gray-100 space-y-2.5">
                        {[
                            { icon: "🚚", label: "Free delivery", sub: "Arrives in 2–4 days" },
                            { icon: "🔄", label: "Free returns", sub: "Within 30 days" },
                            { icon: "🛡️", label: "18-month warranty", sub: "Manufacturer certified" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-3">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                    <p className="text-[11px] font-semibold text-primary">{item.label}</p>
                                    <p className="text-[10px] text-secondary">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* ── sticky bottom bar ──────────────────────────────────────── */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-main/90 backdrop-blur-md px-4 py-3 shadow-[0_-1px_12px_rgba(0,0,0,0.06)]">
                <div className="mx-auto max-w-xl flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-card px-2 py-1.5 shadow-sm ring-1 ring-gray-200">
                        <button
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="h-7 w-7 rounded-xl bg-gray-100 text-sm font-bold text-primary flex items-center justify-center active:bg-gray-200"
                        >
                            −
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-primary">{qty}</span>
                        <button
                            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                            className="h-7 w-7 rounded-xl bg-emerald-600 text-sm font-bold text-white flex items-center justify-center active:bg-emerald-700"
                        >
                            +
                        </button>
                    </div>
                    <button className="flex-1 rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md shadow-emerald-200 active:bg-emerald-700 transition-colors">
                        Add to cart · ${(product.price * qty).toLocaleString()}
                    </button>
                </div>
            </div>
        </main>
    );
}