import { useAuthUser } from "@/features/auth/hooks";
import { LoaderIcon } from "lucide-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return authUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
