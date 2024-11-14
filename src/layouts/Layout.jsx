import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

export default function Layout() {
  return (
    <div>
      <MainNav />
      <main className="h-full   mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
