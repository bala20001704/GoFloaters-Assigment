import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      <aside className="w-60 border-r p-4 flex flex-col gap-4 sticky top-0 h-screen">
        <div className="text-xl font-semibold">My App</div>
        <nav className="flex flex-col gap-3 text-base">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto max-h-screen">{children}</main>
    </div>
  );
}
