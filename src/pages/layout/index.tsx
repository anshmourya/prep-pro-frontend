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
  const { isAuthenticated, user } = useKindeAuth();

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
