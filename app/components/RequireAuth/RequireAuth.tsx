"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useIsLoggedIn } from "@/components/atoms/account.atom";

import Mobile from "../Mobile/Mobile";

interface RequireAuthProps {
  children: ReactNode;
}
function RequireAuth({ children }: RequireAuthProps) {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  const router = useRouter();
  const pathname = usePathname();
  const allowUnauthPaths = useMemo(() => ["/", "/signup"], []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userAgent } = window.navigator;
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
      setIsMobile(mobileRegex.test(userAgent));
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !allowUnauthPaths.includes(pathname)) {
      router.push("/login");
    } else if (isLoggedIn) {
      router.push(pathname);
    }
  }, [isLoggedIn, pathname]);

  if (isMobile && !allowUnauthPaths.includes(pathname)) return <Mobile />;

  return <>{children}</>;
}

export default RequireAuth;
