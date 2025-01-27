import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";

function PageLayout() {
  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 ">
        <Outlet />
      </div>
    </>
  );
}

export default PageLayout;
