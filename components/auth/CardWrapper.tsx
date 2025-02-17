"use client"

import{
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card"
import Header from "./header"
import Social from "./Social"
import BackButton from "./BackButton"

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
      {
        showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )
      }
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}/>
      </CardFooter>
    </Card>
  )
}
