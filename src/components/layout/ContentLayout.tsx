"use client";
import Sidebar from "./Sidebar";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="sticky top-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb">
        <main className="flex-1 p-6 bg-background">{children}</main>
      </div>
    </div>
  );
}
