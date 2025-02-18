import NextAuth from "next-auth";
import authConfig from "./auth.config";
import{
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT
} from "@/routes"

const {auth} = NextAuth(authConfig)



export default auth((req) =>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;


    const isApiRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiRoutes){
        return null;
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return null; 
    }

    if(!isLoggedIn && !isPublicRoutes){
        return Response.redirect(new URL("/auth/login",nextUrl))
    }

    // console.log("Route: ",req.nextUrl.pathname)
    // console.log("isLoggedIn:", isLoggedIn)
})

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }