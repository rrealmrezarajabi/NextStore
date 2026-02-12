import type { Category } from "./category";
export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category; 
  images: string[];
};
