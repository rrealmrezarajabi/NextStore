import type { User, PaginatedUsers } from "../../types/user";
import { BASE_URL } from "./base-url";
import { CreateUserDto } from "../../types/user";
import { UpdateUserDto } from "../../types/user";

// getting users with optional search, page, and limit query params
export async function getUsers({
  search,
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<PaginatedUsers> {
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  query.set("page", page.toString());
  query.set("limit", limit.toString());

  const res = await fetch(`${BASE_URL}/users?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("failed to fetch users");

  return res.json();
}
// getting user info by id function
export async function getUserById(userId: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${userId}`);

  if (!res.ok) throw new Error("failed to fetch user");

  const data = await res.json();

  return data;
}
//creating user function
export async function createUser(userData: CreateUserDto): Promise<User> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("failed to create new user");

  const data = await res.json();

  return data;
}
// updating user function
export async function updateUser(
  userId: number,
  userData: UpdateUserDto,
): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("failed to update user");

  const data = await res.json();

  return data;
}
