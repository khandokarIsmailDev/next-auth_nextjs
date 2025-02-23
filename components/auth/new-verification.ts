"use server"

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db";

interface VerificationToken {
    email: string;
    token: string;
    expires: Date;
}

export const NewVerification = async (token: string) => {
    try {
        const existingToken = await getVerificationTokenByToken(token);

        if (!existingToken) {
            return { error: "Token does not exist!" }
        }

        // Log token data for debugging
        // console.log("Token data:", existingToken);
        
        // Fix expiration check
        const expires = new Date((existingToken as VerificationToken).expires);
        const now = new Date();
        
        // console.log("Expires:", expires);
        // console.log("Now:", now);
        
        if (expires < now) {
            await db.verificationToken.delete({
                where: { token }
            });
            return { error: "Token has expired!" }
        }

        const existingUser = await getUserByEmail((existingToken as VerificationToken).email);
        
        if(!existingUser){
            return { error: "Email does not exist!" }
        }

        // Update user verification status
        await db.user.update({
            where: { id: existingUser.id },
            data: {
                emailVerified: new Date(),
            }
        });

        // Clean up the token after successful verification
        await db.verificationToken.delete({
            where: { token }
        });

        return { success: "Email verified!" }
    } catch (error) {
        // console.error("Verification error:", error);
        return { error: "Something went wrong!" }
    }
}