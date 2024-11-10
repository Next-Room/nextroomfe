"use client";

import React, { useEffect } from "react";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import Loader from "@/components/Loader/Loader";
import {
  getAdminCode,
  getShopName,
  setSelectedThemeId,
} from "@/utils/localStorage";
import { useSelectedTheme } from "@/components/atoms/selectedTheme.atom";
import { useGetThemeList } from "@/queries/getThemeList";
import { useToastInfo } from "@/components/atoms/toast.atom";
import { useRouter } from "next/navigation";
import AdminView from "./AdminView";

type Theme = {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
};

function Admin() {
  const { data: categories = [] } = useGetThemeList();

  const isLoggedIn = useCheckSignIn();

  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const adminCode: string = getAdminCode() || "";
  const shopName: string = getShopName() || "";
  const [toast, setToast] = useToastInfo();
  const router = useRouter();

  useEffect(() => {
    if (categories.length > 0 && selectedTheme.id === 0) {
      setSelectedTheme(categories[categories.length - 1]);
    }
  }, [categories, selectedTheme, setSelectedTheme]);

  const handleClickSelected = (theme: Theme) => {
    setSelectedTheme(theme);
    setSelectedThemeId(theme.id);
    setTimeout(() => {
      if (theme.id) {
        router.push(`/admin-new?themeId=${encodeURIComponent(theme.id)}`);
      }
    }, 10);
  };

  useEffect(() => {
    if (toast.isOpen) {
      setTimeout(() => {
        setToast({ ...toast, isOpen: false });
      }, 3000);
    }
  }, [toast, setToast]);

  const SidebarViewProps = {
    adminCode,
    shopName,
    categories,
    selectedTheme,
    handleClickSelected,
    isOpen: toast.isOpen,
  };

  if (!isLoggedIn) {
    return <Loader />;
  }

  return <AdminView {...SidebarViewProps} />;
}

export default Admin;
