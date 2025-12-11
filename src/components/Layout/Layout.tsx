import type { ReactNode } from "react";
import Sidebar from "./Sidbar";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: ReactNode;
}

const Layout = ({ children, showSidebar = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}

      <div className="flex flex-1">
        {showSidebar && (
          <div className="w-64 border-r bg-white shadow-sm">
            <Sidebar />
          </div>
        )}

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
