"use client";
import { useContext, useEffect } from "react";
import Header from "../commons/Header";
import Sidebar from "../commons/Sidebar";
import { GlobalContext } from "@/contexts/GlobalContext";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { info, updateInfo } = useContext(GlobalContext);

  return (
    <div className="flex h-screen">
      <div className="sticky top-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb">
        <Header />
        <main className="flex-1 p-6 bg-background">{children}</main>
      </div>
    </div>
  );
}
