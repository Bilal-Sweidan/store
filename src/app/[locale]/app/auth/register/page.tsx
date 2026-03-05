"use client"
import { useState, ChangeEvent, FormEvent, DragEvent } from "react";

interface FormData {
    companyName: string;
    managerName: string;
    managerEmail: string;
    managerNumber: string;
    email: string;
    address: string;
    agencyStatement: File | null;
    commercialRegister: File | null;
    termsAccepted: boolean;
    location: [number, number];
}

interface Preview {
    agency: string | null;
    commercial: string | null;
}

export default function AdvancedRegisterPage() {
    const [formData, setFormData] = useState<FormData>({
        companyName: "",
        managerName: "",
        managerEmail: "",
        managerNumber: "",
        email: "",
        address: "",
        agencyStatement: null,
        commercialRegister: null,
        termsAccepted: false,
        location: [0, 0],
    });

    const [preview, setPreview] = useState<Preview>({ agency: null, commercial: null });
    const [dragActive, setDragActive] = useState<{ agency: boolean; commercial: boolean }>({
        agency: false,
        commercial: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            const file = files ? files[0] : null;
            setFormData({ ...formData, [name]: file });
            setPreview({
                ...preview,
                [name === "agencyStatement" ? "agency" : "commercial"]: file
                    ? URL.createObjectURL(file)
                    : null,
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleDrag = (e: DragEvent<HTMLDivElement>, type: "agency" | "commercial") => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive({ ...dragActive, [type]: true });
        } else if (e.type === "dragleave") {
            setDragActive({ ...dragActive, [type]: false });
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, type: "agency" | "commercial") => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            setFormData({ ...formData, [type === "agency" ? "agencyStatement" : "commercialRegister"]: files[0] });
            setPreview({ ...preview, [type]: URL.createObjectURL(files[0]) });
            setDragActive({ ...dragActive, [type]: false });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            const value = formData[key as keyof FormData];
            if (value !== null) data.append(key, value as any);
        });

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: data,
            });
            const result = await res.json();
            alert(result.message || "Registered successfully!");
        } catch (error) {
            console.error(error);
            alert("Registration failed!");
        }
    };

    const renderFileDropArea = (
        label: string,
        fileType: "agency" | "commercial",
        previewUrl: string | null
    ) => (
        <div
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors
        ${dragActive[fileType] ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white"}`}
            onDragEnter={(e) => handleDrag(e, fileType)}
            onDragOver={(e) => handleDrag(e, fileType)}
            onDragLeave={(e) => handleDrag(e, fileType)}
            onDrop={(e) => handleDrop(e, fileType)}
        >
            <label className="cursor-pointer text-sm text-gray-600">
                {label} (Drag & Drop or Click to Upload)
                <input
                    type="file"
                    name={fileType === "agency" ? "agencyStatement" : "commercialRegister"}
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                    className="hidden"
                    required
                />
            </label>
            {previewUrl && (
                <div className="mt-2">
                    {previewUrl.endsWith(".pdf") ? (
                        <p className="text-sm text-gray-700 truncate">{previewUrl.split("/").pop()}</p>
                    ) : (
                        <img src={previewUrl} alt={label} className="mx-auto h-24 object-contain" />
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Register Your Company</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Company Info */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-400"
                        />
                    </div>

                    {/* Manager Info */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Manager Name</label>
                        <input
                            type="text"
                            name="managerName"
                            value={formData.managerName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Manager Email</label>
                        <input
                            type="email"
                            name="managerEmail"
                            value={formData.managerEmail}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Manager Number</label>
                        <input
                            type="text"
                            name="managerNumber"
                            value={formData.managerNumber}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-400"
                        />
                    </div>

                    {/* Company Email & Address */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Company Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-400"
                        />
                    </div>

                    {/* File Uploads */}
                    {renderFileDropArea("Agency Statement", "agency", preview.agency)}
                    {renderFileDropArea("Commercial Register", "commercial", preview.commercial)}

                    {/* Terms Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            required
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                            I accept the terms and conditions
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}