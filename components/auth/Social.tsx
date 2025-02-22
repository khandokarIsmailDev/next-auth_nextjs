"use client"

import {FcGoogle} from "react-icons/fc"
import { signIn } from "next-auth/react"
import {FaGithub} from "react-icons/fa"
import {Button} from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export default function Social() {
  const onClick = (provider:"google" | "github") =>{
    signIn(provider,{
      callbackUrl:DEFAULT_LOGIN_REDIRECT
    })
  }
  return (
    <div className='flex flex-col items-center w-full gap-y-4'>
      <Button
        size="full"
        className="flex justify-center gap-x-5 bg-gray-100 text-black text-base font-semibold hover:bg-white"
       onClick={()=>onClick("google")}
       >
        <FcGoogle/>
        <span>
            Continue with Google
        </span>
      </Button>
      <Button
        size="full"
        className="flex justify-center gap-x-5 bg-gray-100 text-black text-base font-semibold hover:bg-white"
       onClick={()=>onClick("github")}
       >
        <FaGithub/>
        <span>
            Continue with Github
        </span>
      </Button>
    </div>
  )
}
