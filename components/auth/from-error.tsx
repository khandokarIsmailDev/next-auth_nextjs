import { BsExclamationTriangle } from "react-icons/bs"

interface FromErrorProps{
    message?: string;
}

export default function FromError({message}:FromErrorProps) {
    if(!message) return null;
  return (
    <div className="bg-red-400/15 p-3 rounded flex items-center gap-2 text-destructive">
      <BsExclamationTriangle className="text-red-400 text-xl"/>
      <p className="text-sm text-red-400 font-bold">{message}</p>
    </div>
  )
}
