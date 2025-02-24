"use client"

import CardWrapper from "@/components/auth/CardWrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { NewVerification } from "./new-verification"
import FormSuccess from "./form-success"
import FromError from "./from-error"

export const NewVerificationForm = () => {
    const[error,setError] = useState<string | undefined>();
    const[success,setSuccess] = useState<string | undefined>();
    const[isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {
        if(success || error) return;
        if(!token) {
            setError("Token not found");
            setIsLoading(false);
            return;
        }

        try {
            const data = await NewVerification(token);
            
            if (data.success) {
                setSuccess(data.success);
                setError(undefined);
            }
            
            if (data.error) {
                setError(data.error);
                setSuccess(undefined);
            }
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    },[token,success,error]);

    useEffect(() => {
        onSubmit();
    },[onSubmit]);

    return (
        <CardWrapper
            headerText="Verification"
            headerLabel="Confirming Your Account"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex flex-col items-center justify-center w-full gap-2">
                {isLoading && (
                    <BeatLoader color="blue"/>
                )}
                {!isLoading && success && (
                    <FormSuccess message={success}/>
                )}
                {!isLoading && error && (
                    <FromError message={error}/>
                )}
            </div>
        </CardWrapper>
    )
}