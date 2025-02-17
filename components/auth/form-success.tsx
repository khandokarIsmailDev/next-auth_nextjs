import { BsCheckCircle } from "react-icons/bs"

interface FormSuccessProps{
    message?: string;
}

export default function FormSuccess({message}:FormSuccessProps) {
    if(!message) return null;
  return (
    <div className="bg-green-400/15 p-3 rounded flex items-center gap-2 text-green-400">
      <BsCheckCircle className="text-green-400 text-xl"/>
      <p className="text-sm text-green-400 font-bold">{message}</p>
    </div>
  )
}
