import React, { Suspense } from 'react'
import { NewVerificationForm } from "@/components/auth/newVerification-form"

export default function VerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  )
}