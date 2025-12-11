import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useLogin } from "./hooks";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { authStorage } from "./utils";
import { ACCESS_TOKEN_KEY } from "@/services/api/axios";

const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type loginDataType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { loginMutate, isPending, isError, isSuccess, data } = useLogin();
  console.log("REs:", data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginDataType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: loginDataType) => {
    loginMutate(data);
  };

  if (isError) {
    toast.error("User credential invalid please, check it");
  }

  if (isSuccess) {
    toast.success("User Successfully logged in");
  }

  return (
    <div className="container h-screen flex justify-center items-center mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-2 rounded shadow-md p-5 grid gap-9">
          <p className="font-medium flex items-center justify-center gap-4">
            <User size={20} />
            User Enter Credential
          </p>

          <div className="flex items-center justify-center gap-5">
            <label htmlFor="username" className="font-medium">
              UserName
            </label>
            <div>
              <input
                type="text"
                placeholder="Enter username"
                {...register("username")}
                name="username"
                className="border rounded p-2"
              />
              <p className="text-red-400 text-xs">{errors && errors.username?.message}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5">
            <label htmlFor="password" className="font-medium">
              Password
            </label>

            <div>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password")}
                name="password"
                className="border rounded p-2"
                autoComplete="off"
              />
              <p className="text-red-400 text-xs">{errors && errors.password?.message}</p>
            </div>
          </div>

          <Button variant="outline" size="lg" className="bg-blue-500 text-white hover:bg-blue-900 hover:text-white">
            {isPending ? (
              <>
                <Spinner /> Loging
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
