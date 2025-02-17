"use client"

import{
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card"
import Header from "./header"

interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export default function CardWrapper({children,headerLabel,backButtonHref,backButtonLabel,showSocial}:CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md bg-white">
      <CardHeader>
        <Header label={headerLabel}/>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
