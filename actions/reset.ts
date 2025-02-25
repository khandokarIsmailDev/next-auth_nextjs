"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResendEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
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
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResendEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return {success : "Reset password email sent!"}

}