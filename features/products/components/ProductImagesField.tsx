"use client";

import { Plus, Trash2 } from "lucide-react";
import { ImageUploader } from "@/components/shared/ImageUploader";

interface ProductImagesFieldProps {
  images: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, url: string) => void;
}

export function ProductImagesField({
  images,
  onAdd,
  onRemove,
  onUpdate,
}: ProductImagesFieldProps) {
  return (
    <div className="sm:col-span-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-zinc-500">
          Images
        </span>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800 transition"
        >
          <Plus size={12} />
          Add image
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <ImageUploader
              label={`Image ${index + 1}`}
              value={img}
              onChange={(url) => onUpdate(index, url)}
            />
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove image ${index + 1}`}
                className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <Trash2 size={10} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
