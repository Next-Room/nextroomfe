"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useIsLoggedIn } from "@/(shared)/atoms/account.atom";
import { getLoginInfo } from "@/(shared)/auth/storageUtil";

import Mobile from "../../components/Mobile/Mobile";

interface RequireAuthProps {
  children: ReactNode;
}
function RequireAuth({ children }: RequireAuthProps) {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

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
      // 새로고침 시 저장된 토큰이 있으면 로그인 상태만 복원하고 현재 경로를 유지한다.
      // 토큰이 만료된 경우 401 → reissue 흐름이 처리한다.
      const { accessToken, refreshToken, shopName } = getLoginInfo();
      if (accessToken && refreshToken && shopName) {
        setIsLoggedIn(true);
        return;
      }
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, pathname]);

  if (isMobile && !allowUnauthPaths.includes(pathname)) return <Mobile />;

  return <>{children}</>;
}

export default RequireAuth;
