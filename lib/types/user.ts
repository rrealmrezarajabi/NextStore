export interface User {
    id:number,
    name:string,
    role:string,
    email:string,
    password:string,
    avatar:string
}

export interface CreateUser {
    name:string,
    email:string,
    password:string,
    avatar:string
}