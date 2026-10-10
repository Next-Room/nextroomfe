"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useIsLoggedIn } from "@/(shared)/atoms/account.atom";

import Mobile from "../../components/Mobile/Mobile";

interface RequireAuthProps {
  children: ReactNode;
}
function RequireAuth({ children }: RequireAuthProps) {
  const [isLoggedIn] = useIsLoggedIn();

  const router = useRouter();
  const pathname = usePathname();
  const allowUnauthPaths = useMemo(
    () => [
      "/",
      "/signup",
      "/signup/success",
      "/login/findpw",
      "/login/resetpw",
      "/login/resetpw/success",
    ],
    []
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, pathname]);

  if (isMobile && !allowUnauthPaths.includes(pathname)) return <Mobile />;

  return <>{children}</>;
}

export default RequireAuth;
