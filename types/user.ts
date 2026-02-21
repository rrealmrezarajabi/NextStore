export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  avatar: string;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedUsers {
  data: User[];
  meta: PaginatedMeta;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
  avatar?: string;
}
