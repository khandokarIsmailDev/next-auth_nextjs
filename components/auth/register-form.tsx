"use client"
import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "./form-success";
import { register } from "@/actions/register";
import {useState, useTransition} from "react"

import{
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem
} from "@/components/ui/form"
import FromError from "./from-error";


export default function RegisterForm() {

  const [isPending,startTransition] = useTransition()
  const [error,setError] = useState<string | undefined>("")
  const [success,setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver:zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name:""
    }
  })

  const onSubmit = (values:z.infer<typeof RegisterSchema>) =>{
    setError("")
    setSuccess("")

    startTransition(()=>{
      register(values)
      .then((data) =>{
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }
  return (
    <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
        headerText="Auth-Register"
    >
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                placeholder="Enter your name"
                                type="text"
                                className="rounded border-gray-300 placeholder:text-gray-400"
                                />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
              <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    disabled={isPending}
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
                      disabled={isPending}
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
            <FromError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl">
                Create Account
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}
