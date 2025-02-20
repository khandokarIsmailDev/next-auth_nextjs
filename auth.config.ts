import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
        async authorize(credentials){
            const validatedFields = LoginSchema.safeParse(credentials);

            if(validatedFields.success){
                const {email,password} = validatedFields.data;

                const user = await getUserByEmail(email);
                console.log(user)
                //for social login no password
                if(!user || !user.password) return null; 

                const passwordMattched = await bcrypt.compare(
                    password,
                    user.password
                )

                if(passwordMattched) return user;
            }

            return null;
        }
    })
  ],
} satisfies NextAuthConfig