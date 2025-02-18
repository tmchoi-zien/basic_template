"use client";
import ContentLayout from "@/components/layout/ContentLayout";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ContentLayout>{children}</ContentLayout>;
}
