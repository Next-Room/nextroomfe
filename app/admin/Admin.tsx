"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { setSelectedThemeId } from "@/(shared)/auth/storageUtil";
import { useSelectedTheme } from "@/(shared)/atoms/selectedTheme.atom";
import { useToastInfo } from "@/(shared)/atoms/toast.atom";

import { useGetThemeList } from "./apis/theme/getThemeList";
import AdminView from "./AdminView";
import { useGetSubscriptionPlan } from "./apis/getSubscriptionPlan";

type Theme = {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
};

function Admin() {
  useGetSubscriptionPlan();
  const { data: categories = [], isLoading } = useGetThemeList();

  const [selectedTheme, setSelectedTheme] = useSelectedTheme();

  const [toast, setToast] = useToastInfo();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && categories.length === 0) {
      router.push("/admin");
    }
    if (!isLoading && categories.length > 0 && selectedTheme.id === 0) {
      setSelectedTheme(categories[categories.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, categories.length]);

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
    categories,
    selectedTheme,
    handleClickSelected,
    isOpen: toast.isOpen,
    isLoading,
  };

  return <AdminView {...SidebarViewProps} />;
}

export default Admin;
