"use client"

interface LoginButtonProps{
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export default function LoginButton({children,mode="redirect",asChild}:LoginButtonProps) {
    const onClick = () => console.log("login button clicked")
    if(mode === "modal"){
        return <span>Todo: Implement modal</span>
    }
  return (
    <div onClick={onClick} className="cursor-pointer w-full">
      {children}
    </div>
  )
}
