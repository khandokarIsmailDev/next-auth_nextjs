"use server";

import { getUserByEmail } from "@/data/user";
import { ResetPasswordSchema } from "@/schemas";
import { z } from "zod";

export const reset = async(values:z.infer<typeof ResetPasswordSchema>) =>{
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return {error : "Invalid email address!"}
    }

    const {email} = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if(!existingUser){
        return {error : "User not found!"}
    }

    //TODO: generate token & send email

    return {success : "Reset password email sent!"}

}