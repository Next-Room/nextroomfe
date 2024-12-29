"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useCheckSignIn from "@/hooks/useCheckSignIn";
import Loader from "@/components/Loader/Loader";
import { getLoginInfo, setSelectedThemeId } from "@/utils/storageUtil";
import { useSelectedTheme } from "@/components/atoms/selectedTheme.atom";
import { useGetThemeList } from "@/queries/getThemeList";
import { useToastInfo } from "@/components/atoms/toast.atom";

import AdminView from "./AdminView";

type Theme = {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
};

function Admin() {
  const { data: categories = [], isLoading } = useGetThemeList();
  const isLoggedIn = useCheckSignIn();

  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const { adminCode, shopName } = getLoginInfo();

  const [toast, setToast] = useToastInfo();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && categories.length > 0 && selectedTheme.id === 0) {
      setSelectedTheme(categories[categories.length - 1]);
    }
  }, [isLoading]);

  const handleClickSelected = (theme: Theme) => {
    setSelectedTheme(theme);
    setSelectedThemeId(theme.id);
    setTimeout(() => {
      if (theme.id) {
        router.push(`/admin?themeId=${encodeURIComponent(theme.id)}`);
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

  return <AdminView {...SidebarViewProps} />;
}

export default Admin;
