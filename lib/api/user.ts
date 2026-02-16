import type { User } from "../types/user";
import { BASE_URL } from "./base-url";
import { CreateUserDto } from "../types/user";
import { UpdateUserDto } from "../types/user";
export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);

  if (!res.ok) throw new Error("failed to fetch users");

  const data = await res.json();

  return data;
}

export async function getUserById(userId: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${userId}`);

  if (!res.ok) throw new Error("failed to fetch user");

  const data = await res.json();

  return data;
}

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