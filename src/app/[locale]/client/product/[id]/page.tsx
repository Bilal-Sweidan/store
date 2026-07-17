"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Check, Truck, Shield, RefreshCw } from "lucide-react";

interface Product {
    _id: string;
    name: {
        ar: string;
        en: string;
    };
    price: {
        withDiscount: number;
        withoutDiscount: number;
        old: number;
    };
    discount: {
        number: number;
        value: number;
    };
    description: string;
    minAmount: number;
    details: Array<{
        key: string;
        value: string;
        _id: string;
    }>;
    pictures: string[];
    createdAt: string;
    updatedAt: string;
}

export default function ProductDetails() {
    const params = useParams();
    const productId = params.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlist, setIsWishlist] = useState(false);

    useEffect(() => {
        if (productId) {
            fetchProductData();
        }
    }, [productId]);

    async function fetchProductData() {
        try {
            setLoading(true);
            const res = await fetch(`/api/product/${productId}`);
            const data = await res.json();
            setProduct(data.product);
        } catch (err: any) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleQuantityChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else {
            setQuantity(prev => prev > 1 ? prev - 1 : 1);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
                    <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm text-gray-500">
                    <a href="/" className="hover:text-blue-600">Home</a>
                    <span className="mx-2">/</span>
                    <a href="/products" className="hover:text-blue-600">Products</a>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{product.name.en}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg aspect-square">
                            <Image
                                src={product.pictures[selectedImage] || '/placeholder.jpg'}
                                alt={product.name.en}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.discount.number > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    -{product.discount.number}%
                                </div>
                            )}
                            <button
                                onClick={() => setIsWishlist(!isWishlist)}
                                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        {product.pictures.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.pictures.map((pic, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-600' : 'border-transparent'
                                            }`}
                                    >
                                        <Image
                                            src={pic}
                                            alt={`Product ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {product.name.en}
                            </h1>
                            <div className="flex items-center mt-2 space-x-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">(124 reviews)</span>
                                <span className="text-sm text-green-600 flex items-center">
                                    <Check className="w-4 h-4 mr-1" />
                                    In Stock
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-end space-x-3">
                                <span className="text-4xl font-bold text-gray-900">
                                    {formatPrice(product.price.withDiscount)}
                                </span>
                                {product.price.withoutDiscount && (
                                    <span className="text-xl text-gray-400 line-through">
                                        {formatPrice(product.price.withoutDiscount)}
                                    </span>
                                )}
                                {product.discount.number > 0 && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Save {formatPrice(product.discount.value)}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Minimum order: {product.minAmount} units
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Product Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
                                {product.details.map((detail) => (
                                    <div key={detail._id} className="flex justify-between py-3 px-4">
                                        <span className="text-gray-600 capitalize">{detail.key}</span>
                                        <span className="font-medium text-gray-900">{detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <label className="text-gray-700 font-medium">Quantity:</label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange('decrement')}
                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('increment')}
                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {product.minAmount} units minimum
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button>
                                <button className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                                    <Share2 className="w-5 h-5" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Truck className="w-5 h-5 text-blue-600" />
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span>2 Year Warranty</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <RefreshCw className="w-5 h-5 text-blue-600" />
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section (Optional) */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Add related products here */}
                        <p className="col-span-full text-center text-gray-500 py-8">
                            Related products coming soon...
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}