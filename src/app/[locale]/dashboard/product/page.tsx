'use client';
import { useEffect, useState } from 'react';
import ProductTable from '@/components/shared/table/ProductTable';
import AddProductModal from '@/components/shared/models/AddProductModal';
import { IProduct } from '@/types/product';

export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/product');
            const data = await res.json();
            console.log(data)
            setProducts(data.products);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this product?')) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) setProducts(prev => prev.filter(p => p._id !== id));
            else alert('Delete failed');
        } catch (err) { console.error(err); }
    };

    const handleAdd = async (newProduct: Omit<IProduct, '_id'>) => {
        try {
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            if (res.ok) {
                const created = await res.json();
                setProducts(prev => [...prev, created]);
                setModalOpen(false);
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to add');
            }
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="p-8">Loading products...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <button onClick={() => setModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Add Product
                </button>
            </div>
            <ProductTable products={products} onDelete={handleDelete} />
            <AddProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
        </div>
    );
}