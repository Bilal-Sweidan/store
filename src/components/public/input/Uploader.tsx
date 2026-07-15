'use client';

import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';

interface FileUploadProps {
    folder?: string;
    onUploadSuccess?: (result: any) => void;
    onUploadError?: (error: any) => void;
    maxSize?: number; // in MB
    accept?: string;
    multiple?: boolean;
}

export default function FileUploader({
    folder = 'uploads',
    onUploadSuccess,
    onUploadError,
    maxSize = 10,
    accept = 'image/*,.pdf,.doc,.docx',
    multiple = false
}: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [uploadStatus, setUploadStatus] = useState<Record<string, 'idle' | 'uploading' | 'success' | 'error'>>({});
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const validFiles = selectedFiles.filter(file => {
            if (file.size > maxSize * 1024 * 1024) {
                alert(`File ${file.name} exceeds ${maxSize}MB limit`);
                return false;
            }
            return true;
        });

        if (multiple) {
            setFiles(prev => [...prev, ...validFiles]);
        } else {
            setFiles(validFiles.slice(0, 1));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(file => {
            if (file.size > maxSize * 1024 * 1024) {
                alert(`File ${file.name} exceeds ${maxSize}MB limit`);
                return false;
            }
            return true;
        });

        if (multiple) {
            setFiles(prev => [...prev, ...validFiles]);
        } else {
            setFiles(validFiles.slice(0, 1));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0 || isUploading) return;

        setIsUploading(true);
        const uploadedResults = [];

        for (const file of files) {
            setUploadStatus(prev => ({ ...prev, [file.name]: 'uploading' }));

            try {
                // Simulate progress
                for (let progress = 0; progress <= 90; progress += 10) {
                    setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                    await new Promise(resolve => setTimeout(resolve, 100));
                }

                const result = await uploadFile(file);

                setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
                setUploadStatus(prev => ({ ...prev, [file.name]: 'success' }));
                uploadedResults.push(result);
                setUploadedUrls(prev => [...prev, result.data.secure_url]);

                if (onUploadSuccess) {
                    onUploadSuccess(result);
                }
            } catch (error) {
                setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }));
                if (onUploadError) {
                    onUploadError(error);
                }
                console.error('Upload error:', error);
            }
        }

        setIsUploading(false);

        // Clear files after successful upload
        if (uploadedResults.length === files.length) {
            // Wait a moment then clear
            setTimeout(() => {
                setFiles([]);
                setUploadStatus({});
                setUploadProgress({});
            }, 2000);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full max-w-2xl">
            {/* Drop Zone */}
            <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition-colors"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileSelect}
                    className="hidden"
                />
                <div className="flex flex-col items-center gap-2 text-gray-600">
                    <Upload className="w-12 h-12" />
                    <p className="font-medium">Click or drag to upload</p>
                    <p className="text-sm text-gray-400">
                        Max {maxSize}MB per file • {multiple ? 'Multiple files allowed' : 'Single file only'}
                    </p>
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-gray-400">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>

                            {uploadStatus[file.name] === 'uploading' && (
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 transition-all duration-300"
                                            style={{ width: `${uploadProgress[file.name] || 0}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {uploadProgress[file.name] || 0}%
                                    </span>
                                </div>
                            )}

                            {uploadStatus[file.name] === 'success' && (
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            )}

                            {uploadStatus[file.name] === 'error' && (
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <span className="text-xs text-red-500">Failed</span>
                                </div>
                            )}

                            {!uploadStatus[file.name] && (
                                <button
                                    onClick={() => removeFile(index)}
                                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            {files.length > 0 && !files.every(file => uploadStatus[file.name] === 'success') && (
                <button
                    onClick={handleUpload}
                    disabled={isUploading || files.some(file => uploadStatus[file.name] === 'uploading')}
                    className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Uploading...' : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
                </button>
            )}

            {/* Uploaded Images Preview */}
            {uploadedUrls.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {uploadedUrls.map((url, index) => (
                            <div key={index} className="relative aspect-square">
                                <Image
                                    src={url}
                                    alt={`Upload ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}