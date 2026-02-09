"use client";

import { useState } from "react";

type DropdownListProps<T extends string> = {
    data: T[];
    selectedValue: T;
    onChange?: (value: T) => void;
};

export default function DropdownList<T extends string>({
    data,
    selectedValue,
    onChange,
}: DropdownListProps<T>) {
    const [selected, setSelected] = useState<T>(selectedValue);

    return (
        <select
            value={selected}
            onChange={(e) => {
                const value = e.target.value as T;
                setSelected(value);
                onChange?.(value);
            }}
            className="border rounded px-3 py-2"
        >
            {data.map((item) => (
                <option key={item} value={item} className="text-text-primary">
                    {item}
                </option>
            ))}
        </select>
    );
}
