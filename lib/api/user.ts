import type { User } from "../types/user"; 
import { BASE_URL } from "./base-url";


export default async function getUsers():Promise<User[]>{

    const res = await fetch(`${BASE_URL}/users`)

    if(!res.ok) throw new Error('failed to fetch users')

    const data = await res.json()

    return data
}