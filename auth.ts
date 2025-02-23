import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { db } from "./lib/db"
import { LoginSchema } from "./schemas"
import { getUserByEmail, getUserById } from "./data/user";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
 
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true, //pls remove for production ; security risk
    callbacks:{
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" || account?.provider === "github") {
                if (!user.email) return false;
                
                const existingUser = await getUserByEmail(user.email);
                
                if (!existingUser) {
                    const newUser = await db.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            role: "USER",
                            emailVerified: new Date(),
                        }
                    });
                    (user as any).id = newUser.id;
                    (user as any).role = newUser.role;
                } else {
                    // Update emailVerified and image if needed
                    const updateData: any = {};
                    
                    if (!existingUser.emailVerified) {
                        updateData.emailVerified = new Date();
                    }
                    
                    if (!existingUser.image && user.image) {
                        updateData.image = user.image;
                    }
                    
                    if (Object.keys(updateData).length > 0) {
                        await db.user.update({
                            where: { id: existingUser.id },
                            data: updateData
                        });
                    }

                    // Use existing user data
                    (user as any).id = existingUser.id;
                    (user as any).role = existingUser.role;
                    (user as any).name = existingUser.name;
                    (user as any).image = existingUser.image || user.image;
                }
                return true; // Allow social login without additional verification check
            }

            // For credentials provider only
            if (!account?.provider && user.email) {
                const existingUser = await getUserByEmail(user.email);
                if (!existingUser?.emailVerified) return false;
            }

            return true;
        },
        async session({token,session}){
            if(session.user) {
                session.user.id = token.sub as string;
                session.user.role = token.role as UserRole;
                console.log("Session after update:", session);
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                // Initial sign-in
                token.sub = user.id;
                token.role = (user as any).role;
                console.log("Initial JWT token:", token);
                return token;
            }

            // For subsequent requests, verify from database
            if (token.sub) {
                const existingUser = await getUserById(token.sub);
                if (existingUser) {
                    token.role = existingUser.role;
                }
                console.log("Subsequent JWT token:", token);
            }

            return token;
        }
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
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