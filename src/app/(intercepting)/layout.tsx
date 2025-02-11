import { Suspense } from "react";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {

  return (
    <div>
      {children}
      {modal}
    </div>
  )
}
