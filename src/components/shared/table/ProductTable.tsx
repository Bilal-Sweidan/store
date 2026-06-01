import { IProduct } from "@/types/product"; 

export default function ProductTable({ products, onDelete }: { products: IProduct[]; onDelete: (id: string) => void }) {
  if (!products.length) return <p className="text-gray-500">No products found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name (EN)</th>
            <th className="border p-2">Price (without discount)</th>
            <th className="border p-2">Discount %</th>
            <th className="border p-2">Final Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Transport Fees</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => {
            const finalPrice = p.price.withDiscount ?? p.price.withoutDiscount;
            return (
              <tr key={p._id}>
                <td className="border p-2">{p.name?.en || '—'}</td>
                <td className="border p-2">${p.price.withoutDiscount}</td>
                <td className="border p-2">{p.discount?.value ?? '—'}%</td>
                <td className="border p-2">${finalPrice}</td>
                <td className="border p-2">
                  {typeof p.category === 'object' ? p.category?.name : p.category || '—'}
                </td>
                <td className="border p-2">${p.transportationFees ?? 0}</td>
                <td className="border p-2">
                  <button onClick={() => onDelete(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}