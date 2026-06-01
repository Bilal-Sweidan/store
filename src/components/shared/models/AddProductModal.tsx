'use client';
import { useState } from 'react';
import { IProduct } from '@/types/product';

type NewProduct = Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>;

export default function AddProductModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (product: NewProduct) => void }) {
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [description, setDescription] = useState('');
  const [priceWithoutDiscount, setPriceWithoutDiscount] = useState('');
  const [priceWithDiscount, setPriceWithDiscount] = useState('');
  const [priceOld, setPriceOld] = useState('');
  const [discountNumber, setDiscountNumber] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [details, setDetails] = useState<{ key: string; value: string }[]>([]);
  const [pictures, setPictures] = useState<string[]>([]);
  const [transportFees, setTransportFees] = useState('');
  const [transportTime, setTransportTime] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleAddDetail = () => setDetails([...details, { key: '', value: '' }]);
  const handleDetailChange = (idx: number, field: 'key' | 'value', val: string) => {
    const updated = [...details];
    updated[idx][field] = val;
    setDetails(updated);
  };
  const handleRemoveDetail = (idx: number) => setDetails(details.filter((_, i) => i !== idx));

  const handleAddPicture = () => setPictures([...pictures, '']);
  const handlePictureChange = (idx: number, val: string) => {
    const updated = [...pictures];
    updated[idx] = val;
    setPictures(updated);
  };
  const handleRemovePicture = (idx: number) => setPictures(pictures.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn || !priceWithoutDiscount) {
      alert('English name and price (without discount) are required');
      return;
    }
    const product: NewProduct = {
      name: { en: nameEn, ar: nameAr || undefined },
      description: description || undefined,
      price: {
        withoutDiscount: parseFloat(priceWithoutDiscount),
        withDiscount: priceWithDiscount ? parseFloat(priceWithDiscount) : undefined,
        old: priceOld ? parseFloat(priceOld) : undefined,
      },
      discount: (discountNumber || discountValue) ? {
        number: discountNumber ? parseInt(discountNumber) : undefined,
        value: discountValue ? parseFloat(discountValue) : undefined,
      } : undefined,
      minAmount: minAmount ? parseInt(minAmount) : undefined,
      details: details.length ? details.filter(d => d.key && d.value) : undefined,
      picture: pictures.length ? pictures.filter(url => url.trim()) : undefined,
      transportationFees: transportFees ? parseFloat(transportFees) : undefined,
      transportationTime: transportTime || undefined,
      category: categoryId || undefined,
    };
    onAdd(product);
    // reset
    setNameEn(''); setNameAr(''); setDescription(''); setPriceWithoutDiscount(''); setPriceWithDiscount('');
    setPriceOld(''); setDiscountNumber(''); setDiscountValue(''); setMinAmount(''); setDetails([]);
    setPictures([]); setTransportFees(''); setTransportTime(''); setCategoryId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium">Name (EN) *</label>
              <input type="text" value={nameEn} onChange={e => setNameEn(e.target.value)} className="w-full border rounded px-2 py-1" required /></div>
            <div><label className="block text-sm font-medium">Name (AR)</label>
              <input type="text" value={nameAr} onChange={e => setNameAr(e.target.value)} className="w-full border rounded px-2 py-1" dir="rtl" /></div>
          </div>
          <div><label className="block text-sm font-medium">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full border rounded px-2 py-1" /></div>

          {/* Price */}
          <div className="border p-3 rounded">
            <h3 className="font-semibold mb-2">Price</h3>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="text-xs">Without Discount *</label><input type="number" step="0.01" value={priceWithoutDiscount} onChange={e => setPriceWithoutDiscount(e.target.value)} className="w-full border rounded px-1 py-1" required /></div>
              <div><label className="text-xs">With Discount</label><input type="number" step="0.01" value={priceWithDiscount} onChange={e => setPriceWithDiscount(e.target.value)} className="w-full border rounded px-1 py-1" /></div>
              <div><label className="text-xs">Old Price</label><input type="number" step="0.01" value={priceOld} onChange={e => setPriceOld(e.target.value)} className="w-full border rounded px-1 py-1" /></div>
            </div>
          </div>

          {/* Discount & Min Amount */}
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block text-sm">Discount (after X items)</label><input type="number" value={discountNumber} onChange={e => setDiscountNumber(e.target.value)} className="w-full border rounded px-2 py-1" /></div>
            <div><label className="block text-sm">Discount %</label><input type="number" step="0.1" value={discountValue} onChange={e => setDiscountValue(e.target.value)} className="w-full border rounded px-2 py-1" /></div>
            <div><label className="block text-sm">Min Amount</label><input type="number" value={minAmount} onChange={e => setMinAmount(e.target.value)} className="w-full border rounded px-2 py-1" /></div>
          </div>

          {/* Details array */}
          <div>
            <div className="flex justify-between items-center"><label className="block text-sm font-medium">Details (key/value)</label><button type="button" onClick={handleAddDetail} className="text-blue-600 text-sm">+ Add</button></div>
            {details.map((det, idx) => (
              <div key={idx} className="flex gap-2 mt-1">
                <input placeholder="Key" value={det.key} onChange={e => handleDetailChange(idx, 'key', e.target.value)} className="border rounded px-2 py-1 w-1/2" />
                <input placeholder="Value" value={det.value} onChange={e => handleDetailChange(idx, 'value', e.target.value)} className="border rounded px-2 py-1 w-1/2" />
                <button type="button" onClick={() => handleRemoveDetail(idx)} className="text-red-500">✖</button>
              </div>
            ))}
          </div>

          {/* Pictures */}
          <div>
            <div className="flex justify-between"><label className="block text-sm font-medium">Picture URLs</label><button type="button" onClick={handleAddPicture} className="text-blue-600 text-sm">+ Add URL</button></div>
            {pictures.map((url, idx) => (
              <div key={idx} className="flex gap-2 mt-1">
                <input value={url} onChange={e => handlePictureChange(idx, e.target.value)} placeholder="https://..." className="border rounded px-2 py-1 flex-1" />
                <button type="button" onClick={() => handleRemovePicture(idx)} className="text-red-500">✖</button>
              </div>
            ))}
          </div>

          {/* Transportation */}
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm">Transportation Fees ($)</label><input type="number" step="0.01" value={transportFees} onChange={e => setTransportFees(e.target.value)} className="w-full border rounded px-2 py-1" /></div>
            <div><label className="block text-sm">Transportation Time</label><input type="text" value={transportTime} onChange={e => setTransportTime(e.target.value)} placeholder="e.g., 3-5 days" className="w-full border rounded px-2 py-1" /></div>
          </div>

          {/* Category */}
          <div><label className="block text-sm">Category ID (ObjectId)</label>
            <input type="text" value={categoryId} onChange={e => setCategoryId(e.target.value)} placeholder="65f1a2b3c4d5e6f7a8b9c0d1" className="w-full border rounded px-2 py-1" />
            <p className="text-xs text-gray-500">You can later replace this with a dropdown from /api/categories</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}