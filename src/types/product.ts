export interface IProduct {
    _id: string;
    name: { ar?: string; en: string };
    description?: string;
    category?: { _id: string; name: string } | string;
    price: {
        withDiscount?: number;
        withoutDiscount: number;
        old?: number;
    };
    discount?: { number?: number; value?: number };
    minAmount?: number;
    details?: { key: string; value: string }[];
    picture?: string[];
    transportationFees?: number;
    transportationTime?: string;
    createdAt?: string;
    updatedAt?: string;
    pictures: string[]
}