"use client"
import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "./form-success";

import{
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem
} from "@/components/ui/form"
import FromError from "./from-error";


export default function LoginForm() {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })

  const onSubmit = (values:z.infer<typeof LoginSchema>) =>{
    console.log(values)
  }
  return (
    <CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
    >
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FromError message={form.formState.errors.email?.message}/>
            <FormSuccess message={form.formState.errors.password?.message}/>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                Login
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}
