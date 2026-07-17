'use client';

import { useState } from 'react';
import { IProduct } from '@/types/product';
import Uploader from '@/components/public/input/Uploader';

type NewProduct = Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: NewProduct) => void;
  categories?: { _id: string; name: { en: string; ar?: string } }[];
}

export default function AddProductModal({
  isOpen,
  onClose,
  onAdd,
  categories = []
}: AddProductModalProps) {
  // Centralized form state
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    description: '',
    priceWithoutDiscount: '',
    priceWithDiscount: '',
    priceOld: '',
    discountNumber: '',
    discountValue: '',
    minAmount: '',
    transportFees: '',
    transportTime: '',
    categoryId: '',
    pictures: []
  });

  const [details, setDetails] = useState<{ key: string; value: string }[]>([]);
  const [pictures, setPictures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unified input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Details management
  const handleAddDetail = () => setDetails([...details, { key: '', value: '' }]);

  const handleDetailChange = (idx: number, field: 'key' | 'value', val: string) => {
    const updated = [...details];
    updated[idx][field] = val;
    setDetails(updated);
  };

  const handleRemoveDetail = (idx: number) => setDetails(details.filter((_, i) => i !== idx));

  // Pictures management
  const handleAddPicture = () => setPictures([...pictures, '']);

  const handlePictureChange = (idx: number, val: string) => {
    const updated = [...pictures];
    updated[idx] = val;
    setPictures(updated);
  };

  const handleRemovePicture = (idx: number) => setPictures(pictures.filter((_, i) => i !== idx));

  // Reset function - clean separation of reset logic
  const resetForm = () => {
    setFormData({
      nameEn: '',
      nameAr: '',
      description: '',
      priceWithoutDiscount: '',
      priceWithDiscount: '',
      priceOld: '',
      discountNumber: '',
      discountValue: '',
      minAmount: '',
      transportFees: '',
      transportTime: '',
      categoryId: '',
      pictures: []
    });
    setDetails([]);
    setPictures([]);
    setIsSubmitting(false);
  };

  // Submit handler with proper validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.nameEn || !formData.priceWithoutDiscount) {
        alert('English name and price (without discount) are required');
        setIsSubmitting(false);
        return;
      }

      // Build product object matching the schema exactly
      const product: NewProduct = {
        name: {
          en: formData.nameEn.trim(),
          ar: formData.nameAr.trim() || undefined,
        },
        description: formData.description.trim() || undefined,
        category: formData.categoryId || undefined,
        price: {
          withoutDiscount: parseFloat(formData.priceWithoutDiscount),
          withDiscount: formData.priceWithDiscount ? parseFloat(formData.priceWithDiscount) : undefined,
          old: formData.priceOld ? parseFloat(formData.priceOld) : undefined,
        },
        discount: (formData.discountNumber || formData.discountValue) ? {
          number: formData.discountNumber ? parseInt(formData.discountNumber) : undefined,
          value: formData.discountValue ? parseFloat(formData.discountValue) : undefined,
        } : undefined,
        minAmount: formData.minAmount ? parseInt(formData.minAmount) : undefined,
        details: details.length > 0 ? details.filter(d => d.key.trim() && d.value.trim()) : undefined,
        picture: pictures.length > 0 ? pictures.filter(url => url.trim()) : undefined,
        transportationFees: formData.transportFees ? parseFloat(formData.transportFees) : undefined,
        transportationTime: formData.transportTime.trim() || undefined,
        pictures: formData.pictures || []
      };

      await onAdd(product);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadSuccess = (result: any) => {
    console.log('Upload successful:', result);
    // You can save the Cloudinary URL to your database here
    const imageUrl = result.data.secure_url;
    setFormData(prev => ({ ...prev, pictures: [...prev.pictures, imageUrl] }))
  };

  const handleUploadError = (error: any) => {
    console.error('Upload failed:', error);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME SECTION */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wider">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700 mb-1">
                  Name (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  id="nameEn"
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter product name in English"
                  required
                />
              </div>
              <div>
                <label htmlFor="nameAr" className="block text-sm font-medium text-gray-700 mb-1">
                  Name (AR)
                </label>
                <input
                  id="nameAr"
                  type="text"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="اسم المنتج بالعربية"
                  dir="rtl"
                />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Enter product description"
              />
            </div>
          </div>

          {/* PRICE SECTION */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wider">
              Pricing
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="priceWithoutDiscount" className="block text-sm font-medium text-gray-700 mb-1">
                  Without Discount <span className="text-red-500">*</span>
                </label>
                <input
                  id="priceWithoutDiscount"
                  type="number"
                  name="priceWithoutDiscount"
                  value={formData.priceWithoutDiscount}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label htmlFor="priceWithDiscount" className="block text-sm font-medium text-gray-700 mb-1">
                  With Discount
                </label>
                <input
                  id="priceWithDiscount"
                  type="number"
                  name="priceWithDiscount"
                  value={formData.priceWithDiscount}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="priceOld" className="block text-sm font-medium text-gray-700 mb-1">
                  Old Price
                </label>
                <input
                  id="priceOld"
                  type="number"
                  name="priceOld"
                  value={formData.priceOld}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* DISCOUNT & MIN AMOUNT */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wider">
              Discount & Limits
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="discountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (after X items)
                </label>
                <input
                  id="discountNumber"
                  type="number"
                  name="discountNumber"
                  value={formData.discountNumber}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="100"
                />
              </div>
              <div>
                <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  id="discountValue"
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="14"
                />
              </div>
              <div>
                <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Amount
                </label>
                <input
                  id="minAmount"
                  type="number"
                  name="minAmount"
                  value={formData.minAmount}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="1"
                />
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">
                Product Details
              </h3>
              <button
                type="button"
                onClick={handleAddDetail}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                + Add Detail
              </button>
            </div>
            {details.length > 0 ? (
              details.map((det, idx) => (
                <div key={idx} className="flex gap-2 mt-2">
                  <input
                    placeholder="Key (e.g., Brand)"
                    value={det.key}
                    onChange={e => handleDetailChange(idx, 'key', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <input
                    placeholder="Value (e.g., Nike)"
                    value={det.value}
                    onChange={e => handleDetailChange(idx, 'value', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDetail(idx)}
                    className="text-red-500 hover:text-red-700 px-3 transition-colors"
                    aria-label="Remove detail"
                  >
                    ✖
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No details added yet. Click "Add Detail" to add product specifications.</p>
            )}
          </div>

          {/* PICTURES */}
          <div className="border-b border-gray-200 pb-4">
            <Uploader
              folder="user-uploads"
              maxSize={10}
              accept="image/*,.pdf,.doc,.docx"
              multiple={true}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError} />
          </div>

          {/* TRANSPORTATION */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wider">
              Shipping & Delivery
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="transportFees" className="block text-sm font-medium text-gray-700 mb-1">
                  Transportation Fees ($)
                </label>
                <input
                  id="transportFees"
                  type="number"
                  name="transportFees"
                  value={formData.transportFees}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="transportTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Transportation Time
                </label>
                <input
                  id="transportTime"
                  type="text"
                  name="transportTime"
                  value={formData.transportTime}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="3-5 business days"
                />
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="pb-2">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            {categories.length > 0 ? (
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name.en}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="categoryId"
                type="text"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter category ID (ObjectId)"
              />
            )}
            <p className="text-xs text-gray-400 mt-1">
              {categories.length > 0
                ? 'Select from existing categories'
                : 'You can later replace this with a dropdown from /api/categories'}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}