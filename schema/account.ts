import {z} from 'zod'
export const loginSchema = z.object({
    identifier : z.string().min(1,"Identifier should have minimum 1 character"),
    password : z.string().min(8,"Password must be minimum 8 characters long")
})

export const signupSchema = z.object({
    name : z.string().min(2,"Minimum 2 characters required"),
    username : z.string().min(1,"Minimum 1 character reuqired"),
    email : z.string().email("Not a valid email address"),
    password : z.string().min(8,"Password must be 8 characters long")
})