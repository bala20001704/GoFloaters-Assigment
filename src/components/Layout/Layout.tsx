import { useAuthUser } from "@/features/auth/hooks";
import { usegetCart } from "@/features/cart/hooks";
import { User } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const userId = authUser?.id;

  const { cartData } = usegetCart(userId);
  const cartLength = cartData?.carts[0].products.length;

  const handleDashboard = () => {
    navigate("/home");
  };

  return (
    <div className={"max-w-44 h-full flex flex-col p-5 bg-white shadow-lg border border-gray-200"}>
      <div className="mb-10 font-bold">Logo</div>
      <div className="flex flex-1 flex-col gap-5">
        <div className="font-medium cursor-pointer" onClick={() => handleDashboard()}>
          Dashboard
        </div>
        <div className="">
          <span className="font-medium">Cart</span>{" "}
          {cartLength && (
            <span className="bg-blue-500 text-white text-xs font-normal px-2 py-1 rounded-full">{cartLength}</span>
          )}
        </div>
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
