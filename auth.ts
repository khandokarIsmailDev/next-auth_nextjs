import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByEmail, getUserById } from "./data/user";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
 
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true, //pls remove for production ; security risk
    callbacks:{
        async session({token,session}){
            // console.log(session);
            if(token.sub && session.user){
                session.user.id = token.sub;
            }

            if(token.role && session.user) {
                // Extend the session.user type to include role
                // (session.user as any).role = token.role as "ADMIN" | "USER";
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            token.role = existingUser?.role;
            // console.log(token)
            return token;
        }
    },
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
})