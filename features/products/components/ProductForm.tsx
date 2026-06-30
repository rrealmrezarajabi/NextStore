"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { resolveImageUrl } from "@/features/files/services/files.service";
import { useAllCategories } from "@/features/categories/hooks/use-category-queries";
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "@/features/products/hooks/use-product-mutations";
import {
  createProductSchema,
  updateProductSchema,
} from "@/features/products/schemas/product-schema/product.schema";
import type {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from "@/features/products/types";
import { ProductFormFields } from "./ProductFormFields";
import { ProductImagesField } from "./ProductImagesField";

const createProductFormSchema = createProductSchema.omit({ images: true });
const updateProductFormSchema = updateProductSchema.omit({ images: true });



type ProductFormValues = Omit<CreateProductDTO, "images">;

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: number;
  product?: Product;
}

export function ProductForm({ mode, productId, product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const categoriesQuery = useAllCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const submitMutation = isEdit ? updateProductMutation : createProductMutation;

  const [imageDraft, setImageDraft] = useState<{
    key: string;
    values: string[];
  } | null>(null);

  const draftKey = isEdit ? `edit-${productId}` : "create";

  const initialImages = useMemo(
    () =>
      product?.images?.length
        ? product.images.map((img) => resolveImageUrl(img))
        : [""],
    [product],
  );

  const images =
    imageDraft?.key === draftKey ? imageDraft.values : initialImages;

  const setImages = (values: string[]) =>
    setImageDraft({ key: draftKey, values });
  const addImage = () => setImages([...images, ""]);
  const removeImage = (index: number) =>
    setImages(images.filter((_, i) => i !== index));
  const updateImage = (index: number, url: string) =>
    setImages(images.map((img, i) => (i === index ? url : img)));


  const resolver = useMemo(
    () =>
      zodResolver(
        isEdit ? updateProductFormSchema : createProductFormSchema,
      ) as Resolver<ProductFormValues>,
    [isEdit],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({ resolver });

  useEffect(() => {
    if (!isEdit || !product) return;

    setValue("title", product.title);
    setValue("price", product.price);
    setValue("description", product.description ?? "");
    setValue("categoryId", product.category?.id);
  }, [isEdit, product, setValue]);

  const onSubmit = async (data: ProductFormValues) => {
    const payload = {
      ...data,
      price: Number(data.price),
      categoryId: Number(data.categoryId),
      images: images.filter(Boolean),
    };

    try {
      if (isEdit && productId) {
        await updateProductMutation.mutateAsync({
          id: productId,
          data: payload as UpdateProductDTO,
        });
      } else {
        await createProductMutation.mutateAsync(payload as CreateProductDTO);
      }
      router.push("/admin/products");
    } catch (error) {
      console.error(
        isEdit ? "Failed to update product" : "Failed to create product",
        error,
      );
    }
  };

  const onDelete = async () => {
    if (!productId) return;
    try {
      await deleteProductMutation.mutateAsync(productId);
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">
            {isEdit ? "Edit Product" : "Create Product"}
          </h1>
          <p className="text-sm text-zinc-600">
            {isEdit
              ? "Update product details."
              : "Add a new product to your catalog."}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/products">Back to products</Link>
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-zinc-200 bg-white p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ProductFormFields
            register={register}
            errors={errors}
            categories={categoriesQuery.data ?? []}
          />
          <ProductImagesField
            images={images}
            onAdd={addImage}
            onRemove={removeImage}
            onUpdate={updateImage}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {isEdit ? (
            <Button
              type="button"
              variant="destructive"
              disabled={deleteProductMutation.isPending}
              onClick={onDelete}
            >
              Delete Product
            </Button>
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitMutation.isPending}>
              {submitMutation.isPending
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                  ? "Save Changes"
                  : "Create Product"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
