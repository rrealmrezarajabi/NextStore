import type { Category } from "../types/category";
import { BASE_URL } from "./api ";

export async function getCategories():Promise<Category[]> {

    const res = await fetch(`${BASE_URL}/categories` , {
        next : {revalidate : 60}
    })

    if(!res.ok) throw new Error("failed to fetch categories")

    const data = res.json()

    return data
    
}