"use client";

import { useCallback, useEffect, useState, useRef, useId } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { getApiErrorMessage } from "@/lib/api/error-message";
import {
  uploadFile,
  resolveImageUrl,
} from "@/features/files/services/files.service";

const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_IMAGE_FORMATS = "image/jpeg,image/png,image/webp";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = "Upload Image",
}: ImageUploaderProps) {
  const inputId = useId();
  const [preview, setPreview] = useState<string | null>(
    resolveImageUrl(value) || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const revokeObjectUrl = useCallback(() => {
    if (!objectUrlRef.current) return;
    URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
  }, []);

  useEffect(() => {
    revokeObjectUrl();
    setPreview(resolveImageUrl(value) || null);

    return revokeObjectUrl;
  }, [revokeObjectUrl, value]);

  const handleFile = async (file: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setError(`Image must be ${MAX_IMAGE_SIZE_MB}MB or smaller.`);
      return;
    }

    revokeObjectUrl();
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPreview(objectUrl);
    setError(null);
    setLoading(true);

    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      revokeObjectUrl();
      setError(
        getApiErrorMessage(
          err,
          "The server could not upload this image. Try again.",
        ),
      );
      setPreview(resolveImageUrl(value) || null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    revokeObjectUrl();
    setPreview(null);
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-xs uppercase tracking-wide text-zinc-500"
      >
        {label}
      </label>

      <div className="relative w-32 h-32">
        {preview ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-zinc-200">
            <Image
              src={preview}
              alt={label}
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
                aria-label={`Remove ${label}`}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className="flex flex-col items-center justify-center w-full h-full rounded-lg border-2 border-dashed border-zinc-300 cursor-pointer hover:border-zinc-400 transition bg-zinc-50"
          >
            <Upload size={20} className="text-zinc-400" />
            <span className="mt-1 text-xs text-zinc-400">
              {loading ? "Uploading..." : "Click to upload"}
            </span>

            <input
              id={inputId}
              ref={inputRef}
              type="file"
              accept={ACCEPTED_IMAGE_FORMATS}
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
