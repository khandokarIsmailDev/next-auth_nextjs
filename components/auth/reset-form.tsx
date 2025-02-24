"use client"
import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { z } from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "./form-success";
import { reset } from "@/actions/reset";
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
import Link from "next/link";


export default function ResetForm() {

  const [isPending,startTransition] = useTransition()
  const [error,setError] = useState<string | undefined>("")
  const [success,setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver:zodResolver(ResetPasswordSchema),
    defaultValues:{
      email:""
    }
  })

  const onSubmit = (values:z.infer<typeof ResetPasswordSchema>) =>{
    setError("")
    setSuccess("")

    console.log(values)

    startTransition(()=>{
      reset(values)
      .then((data) =>{
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  return (
    <CardWrapper
        headerLabel=""
        backButtonLabel="Back To Login?"
        backButtonHref="/auth/login"
        headerText="Reset Password"
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
                
              
            </div>
            <FromError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                Send reset email
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}
