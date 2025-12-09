import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthUser, login } from "./api";
import type { LoginResponse, Users } from "./types";
import { toast } from "react-hot-toast";

interface LoginData {
  username: string;
  password: string;
}

interface ApiError {
  status: number;
  message: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: LoginMutate, isPending } = useMutation<LoginResponse, ApiError, LoginData>({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.user.firstName);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {},
  });

  return {
    LoginMutate,
    isPending,
  };
};

export const useAuthUser = () => {
  const authUser = useQuery<Users | null, ApiError>({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data,
  };
};
