import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import { cn } from "@/lib/utils";
interface PageLayoutProps {
  isHeader?: boolean;
  className?: string;
}
function PageLayout({ isHeader = true, className }: PageLayoutProps) {
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
