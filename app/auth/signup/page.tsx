import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/login-button";
const font = Poppins({
    subsets: ['latin'],
    weight: [ '700'],
})

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center bg-gray-100 pt-10">
      <h1 className={cn('md:text-3xl text-xl font-bold mb-5 ', font.className)}>
        Sign up or create an account
      </h1>
      <div className="w-[90%] sm:w-[400px] p-8 bg-white rounded-xl">
        <div className="flex flex-col items-center justify-center gap-4">
            <LoginButton>  
                <Button variant="default" size="full">
                    Login
                </Button>
            </LoginButton>
         
        </div>
      </div>
    </div>
  );
}
