import Loading from "@/components/loading/Loading";
import { Suspense } from "react";

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      {children}
    </>
  )
}
