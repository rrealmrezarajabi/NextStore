"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadFile, resolveImageUrl } from "@/lib/api/file";

interface ImageUploaderProps {
  value?: string; // برای حالت edit (اختیاری)
  onChange: (url: string) => void; // خروجی آپلود (location)
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = "Upload Image",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(
    resolveImageUrl(value) || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    // فقط عکس قبول کن
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // preview محلی
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setError(null);
    setLoading(true);

    try {
      const url = await uploadFile(file); // "/uploads/....jpg"
      onChange(url); // بده به فرم
    } catch (err) {
      console.error(err);
      setError("Upload failed. Try again.");
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </label>

      <div className="relative w-32 h-32">
        {preview ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-zinc-200">
            <Image
              src={preview}
              alt="preview"
              fill
              className="object-cover"
              unoptimized
            />

            {loading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}

            {!loading && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-full rounded-lg border-2 border-dashed border-zinc-300 cursor-pointer hover:border-zinc-400 transition bg-zinc-50">
            <Upload size={20} className="text-zinc-400" />
            <span className="mt-1 text-xs text-zinc-400">
              {loading ? "Uploading..." : "Click to upload"}
            </span>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
