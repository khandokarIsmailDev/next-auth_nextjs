import { z } from "zod"

export const LoginSchema = z.object({
    email:z.string().email({
        message:"Invalid email address"
    }),
    password:z.string().min(1,{
        message:"Password is required"
    })
})

export const RegisterSchema = z.object({
    email:z.string().email({
        message:"Invalid email address"
    }),
    password:z.string().min(6,{
        message:"Password must be at least 6 characters"
    }),
    name:z.string().min(1,{
        message:"Name is required"
    })
})

export const ResetPasswordSchema = z.object({
    email:z.string().email({
        message:"Invalid email address"
    })
})

export const NewPasswordSchema = z.object({
    password:z.string().min(6,{
        message:"Password must be at least 6 characters"
    })
})