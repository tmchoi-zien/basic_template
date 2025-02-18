"use client";
import ContentLayout from "@/components/layout/ContentLayout";

export default function AssetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ContentLayout>{children}</ContentLayout>;
}
