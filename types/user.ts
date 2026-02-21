export interface User {
    id:number,
    name:string,
    role:string,
    email:string,
    password:string,
    avatar:string
}

export interface CreateUserDto {
    name:string,
    email:string,
    password:string,
    avatar:string
}

export interface UpdateUserDto{
  email?: string;
  name?: string;
  password?: string;
  avatar?: string;
};