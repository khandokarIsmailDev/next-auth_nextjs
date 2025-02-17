"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BackButtonProps{
    label:string;
    href:string;
}

export default function BackButton({label,href}:BackButtonProps) {
  return (
    <Button
        variant="link"
        className="font-medium w-full"
        asChild
    >
      
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}
