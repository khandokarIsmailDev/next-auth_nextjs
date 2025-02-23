"use client"

import CardWrapper from "@/components/auth/CardWrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { BeatLoader } from "react-spinners"

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() =>{
        console.log(token)
    },[token])

    useEffect(() =>{
        onSubmit()
    },[onSubmit])

    return (
        <CardWrapper
            headerText="Verification"
            headerLabel="Confirming Your Account"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                <BeatLoader color="blue"/>
            </div>
        </CardWrapper>
    )
}