import { useAuthUser } from "@/features/auth/hooks";
import { User } from "lucide-react";
import type { PropsWithChildren } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <div className="h-screen flex">
      <SideBar />
      <div className="container flex-1">{children}</div>
    </div>
  );
};

export default Layout;

const SideBar = () => {
  const { authUser } = useAuthUser();

  return (
    <div className={"max-w-44 h-full flex flex-col p-5 bg-white shadow-lg border border-gray-200"}>
      <div className="mb-10 font-bold">Logo</div>
      <div className="flex flex-1 flex-col gap-5">
        <div className="font-medium">Dashboard</div>
        <div className="font-medium">Cart</div>
        <div className="font-medium">WhisList</div>
      </div>
      <div className="flex items-center gap-6 border p-2 rounded-md bg-blue-800 text-white">
        <p>{authUser?.username}</p>
        <p className="">
          <User size={20} />
        </p>
      </div>
    </div>
  );
};
