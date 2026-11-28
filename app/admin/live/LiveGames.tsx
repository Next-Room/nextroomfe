"use client";

import { useRouter } from "next/navigation";

import "../(styles)/admin.modules.sass";
import "./styles/liveGames.modules.sass";
import Sidebar from "@/admin/(components)/Sidebar";
import { useGetThemeList, Theme } from "@/admin/apis/theme/getThemeList";
import { useGetSubscriptionPlan } from "@/admin/apis/getSubscriptionPlan";
import { useSelectedTheme } from "@/(shared)/atoms/selectedTheme.atom";
import { setSelectedThemeId } from "@/(shared)/auth/storageUtil";
import Loader from "@/(shared)/components/Loader/Loader";

import LiveGameBoard from "./components/LiveGameBoard";

function LiveGames() {
  useGetSubscriptionPlan();
  const { data: categories = [], isLoading } = useGetThemeList();
  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const router = useRouter();

  const handleClickSelected = (theme: Theme) => {
    setSelectedTheme(theme);
    setSelectedThemeId(theme.id);
    router.push(`/admin?themeId=${encodeURIComponent(theme.id)}`);
  };

  if (isLoading) return <Loader />;
  return (
    <div className="admin-main">
      <Sidebar
        categories={categories}
        selectedTheme={selectedTheme}
        handleClickSelected={handleClickSelected}
      />
      <div className="content-area">
        <LiveGameBoard />
      </div>
    </div>
  );
}

export default LiveGames;
