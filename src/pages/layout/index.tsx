import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/header";
import { cn } from "@/lib/utils";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
interface PageLayoutProps {
  isHeader?: boolean;
  className?: string;
}
function PageLayout({ isHeader = true, className }: PageLayoutProps) {
  const { isAuthenticated, user, isLoading } = useKindeAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-10">
        <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isHeader && <Header />}
      <div className={cn("container mx-auto mt-10", className)}>
        <Outlet />
      </div>
    </>
  );
}

export default PageLayout;
