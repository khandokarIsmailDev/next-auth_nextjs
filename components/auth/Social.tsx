"use client"

import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import {Button} from "@/components/ui/button"

export default function Social() {
  return (
    <div className='flex flex-col items-center w-full gap-y-4'>
      <Button
        size="full"
        className="flex justify-center gap-x-5 bg-gray-100 text-black text-base font-semibold hover:bg-white"
       onClick={()=>{}}
       >
        <FcGoogle/>
        <span>
            Continue with Google
        </span>
      </Button>
      <Button
        size="full"
        className="flex justify-center gap-x-5 bg-gray-100 text-black text-base font-semibold hover:bg-white"
       onClick={()=>{}}
       >
        <FaGithub/>
        <span>
            Continue with Github
        </span>
      </Button>
    </div>
  )
}
