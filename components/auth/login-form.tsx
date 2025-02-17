"use client"
import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import{
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem
} from "@/components/ui/form"


export default function LoginForm() {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })
  return (
    <CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
    >
        <Form {...form} >
          <form onSubmit={form.handleSubmit(()=>{})} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    placeholder="Enter your email"
                    type="email"
                    className="rounded border-gray-300 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500"/>
                </FormItem>
                )}
              />
                
              <FormField
                control={form.control}
                name="password"
                render = {({field}) =>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                      {...field}
                      placeholder="Enter your password"
                      type="password"
                      className="rounded border-gray-300 placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 "/>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                Login
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}
