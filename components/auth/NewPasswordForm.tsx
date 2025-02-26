"use client";
import { newPassword } from "@/actions/new-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardWrapper from "./CardWrapper";
import FormSuccess from "./form-success";
import { useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FromError from "./from-error";

export default function NewPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")


  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    console.log(values);

    startTransition(() => {
      newPassword(values,token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel=""
      backButtonLabel="Back To Login?"
      backButtonHref="/auth/login"
      headerText="Enter a new password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                      className="rounded border-gray-300 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FromError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full text-md font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
