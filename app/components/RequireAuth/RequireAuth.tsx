"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useGetThemeList } from "@/queries/getThemeList";
import {
  useCurrentTheme,
  useCurrentThemeReset,
} from "@/components/atoms/currentTheme.atom";
import { useSelectedThemeReset } from "@/components/atoms/selectedTheme.atom";
import { useIsLoggedIn } from "@/components/atoms/account.atom";
import { getSelectedThemeId } from "@/utils/storageUtil";

import Mobile from "../Mobile/Mobile";

interface RequireAuthProps {
  children: ReactNode;
}
function RequireAuth({ children }: RequireAuthProps) {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();
  const [currentTheme, setCurrentTheme] = useCurrentTheme();
  const resetCurrentTheme = useCurrentThemeReset();
  const resetSelectedTheme = useSelectedThemeReset();
  const router = useRouter();
  const pathname = usePathname();
  const allowUnauthPaths = useMemo(() => ["/", "/trial", "/signup"], []);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: categories = [] } = useGetThemeList();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userAgent } = window.navigator;
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
      setIsMobile(mobileRegex.test(userAgent));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentTheme(categories.map(({ id, title }) => ({ id, title })));
    } else {
      resetCurrentTheme();
      resetSelectedTheme();
    }
  }, [categories, setCurrentTheme]);
  useEffect(() => {
    const selectedThemeId = getSelectedThemeId();

    if (!isLoggedIn && !allowUnauthPaths.includes(pathname)) {
      router.push("/login");
    } else if (isLoggedIn && pathname === "/") {
      router.push(pathname);
    } else if (isLoggedIn && currentTheme.length === 0) {
      router.push("/admin");
    } else if (selectedThemeId !== "0" && isLoggedIn) {
      router.push(`/admin?themeId=${selectedThemeId}`);
    }
  }, [isLoggedIn, currentTheme, router, allowUnauthPaths, pathname]);

  if (isLoading) {
    return <></>;
  }

  if (isMobile && !allowUnauthPaths.includes(pathname)) return <Mobile />;

  return <>{children}</>;
}

export default RequireAuth;
