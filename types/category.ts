export interface Category {
  id: number;
  name: string;
  image?: string;
}

export interface CreateCategoryDTO {
  name: string;
  image?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  image?: string;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedCategories {
  data: Category[];
  meta: PaginatedMeta;
}
