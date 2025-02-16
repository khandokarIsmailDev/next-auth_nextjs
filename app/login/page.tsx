import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center bg-gray-100 pt-10">
      <h1 className="md:text-3xl text-xl font-bold mb-5 ">
        Sign up or create an account{" "}
      </h1>
      <div className="w-[90%] sm:w-[400px] p-8 bg-white rounded-xl">
        <div className="flex flex-col items-center justify-center gap-4">
          <Button variant="default" size="lg">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
