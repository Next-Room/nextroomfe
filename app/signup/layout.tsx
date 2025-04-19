import { Suspense } from "react";

import "./styles/signup.modules.sass";
import Loader from "@/(shared)/components/Loader/Loader";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
