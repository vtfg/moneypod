"use client";

import Navbar from "~/components/dashboard/navbar";
import UserNavigation from "~/components/dashboard/user-navigation";
import Logo from "~/components/logo";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="border-b px-4">
        <div className="flex h-16 items-center px-4">
          <Logo />
          <Navbar className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNavigation />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <main className="space-y-4">{children}</main>
      </div>
    </div>
  );
}
