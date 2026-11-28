import { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import {
  logoProps,
  plusDisableProps,
  plusProps,
  subscribeLinkURL,
} from "@/admin/(consts)/sidebar";
import {
  getLoginInfo,
  getSelectedThemeId,
  getStatus,
  removeLocalStorageAll,
  removeThemeId,
} from "@/(shared)/auth/storageUtil";
import { useSelectedThemeReset } from "@/(shared)/atoms/selectedTheme.atom";
import { useDrawerState } from "@/(shared)/atoms/drawer.atom";
import useModal from "@/(shared)/hooks/useModal";
import HintDialog from "@/(shared)/components/Dialog/Hint/Dialog";
import { QUERY_KEY } from "@/admin/apis/theme/getThemeList";

interface Theme {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

const LIVE_GAMES_PATH = "/admin/live";

interface Props {
  categories: Theme[];
  selectedTheme: Theme;
  handleClickSelected: (theme: Theme) => void;
}

export default function Sidebar(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isLiveGamesPage = pathname === LIVE_GAMES_PATH;
  const resetSelectedTheme = useSelectedThemeReset();
  const queryClient = useQueryClient();

  const [drawer, setDrawer] = useDrawerState();
  const { open } = useModal();

  const status = getStatus();
  const searchParams = useSearchParams();
  const selectedThemeId = getSelectedThemeId();
  const params = new URLSearchParams(searchParams.toString()).toString();
  const { categories, handleClickSelected } = props;
  const [loginInfo, setLoginInfo] = useState({
    shopName: "",
  });

  useEffect(() => {
    const { shopName } = getLoginInfo(); // getLoginInfo로 값 가져오기
    setLoginInfo({ shopName }); // 상태 업데이트
  }, []);

  const handleLogout = () => {
    removeLocalStorageAll();
    resetSelectedTheme();
    setLoginInfo({
      shopName: "",
    });
    window.location.href = "/login";
  };
  useEffect(() => {
    // 모니터링 화면에서는 테마를 직접 고를 때만 테마 화면으로 이동한다.
    if (isLiveGamesPage) return;
    if (selectedThemeId && selectedThemeId !== "0")
      router.push(
        `/admin?themeId=${encodeURIComponent(selectedThemeId)}
      `
      );
  }, [selectedThemeId, params, isLiveGamesPage]);

  const navigateToNewTheme = () => {
    resetSelectedTheme();
    router.push("/admin");
    setDrawer({ ...drawer, isOpen: false });
  };
  const handleSelectTheme = async (theme: Theme) => {
    if (drawer.isOpen && !drawer.isSameHint) {
      open(HintDialog, {
        type: "put",
        fn: () => {
          handleClickSelected(theme);
          setDrawer({ ...drawer, isOpen: false });
        },
      });
    } else {
      setDrawer({ ...drawer, isOpen: false });
      await queryClient.invalidateQueries(QUERY_KEY);
      handleClickSelected(theme);
    }
  };

  const handleClickLiveGames = () => {
    if (drawer.isOpen && !drawer.isSameHint) {
      open(HintDialog, {
        type: "put",
        fn: () => {
          setDrawer({ ...drawer, isOpen: false });
          router.push(LIVE_GAMES_PATH);
        },
      });
    } else {
      setDrawer({ ...drawer, isOpen: false });
      router.push(LIVE_GAMES_PATH);
    }
  };

  const handleCreateTheme = () => {
    if (drawer.isOpen && !drawer.isSameHint) {
      open(HintDialog, { type: "put", fn: navigateToNewTheme });
    } else {
      removeThemeId();
      setDrawer({ ...drawer, isOpen: false });
      navigateToNewTheme();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__shop-info">
          <div className="sidebar__shop-info-img-box">
            <Image {...logoProps} className="sidebar__shop-logo" />
            <div />
            <button
              className="sidebar__shop-info-logout-btn"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
          <div className="sidebar__shop-name-box">
            <span className="sidebar__shop-name">
              {loginInfo.shopName?.replaceAll(`"`, "")}
            </span>
          </div>
          <div className="sidebar__subscribe-status-box">
            <div
              className={`sidebar__subscribe-status-circle ${
                status?.replaceAll(`"`, "") === "SUBSCRIPTION"
                  ? "is-subscribed"
                  : "is-unsubscribed"
              }`}
            ></div>
            <span className="sidebar__subscribe-status-text">
              {status?.replaceAll(`"`, "") === "SUBSCRIPTION"
                ? "구독 중"
                : "미구독"}
            </span>
          </div>
        </div>
        <button
          type="button"
          className={classNames("sidebar__theme-button sidebar__live-games", {
            selected: isLiveGamesPage,
          })}
          onClick={handleClickLiveGames}
        >
          모니터링
          <span className="beta-badge">BETA</span>
        </button>
        <div className="sidebar__theme-title">우리 지점 테마</div>
      </div>
      <div className="sidebar__scroll">
        <ul className="sidebar__theme-list">
          {[...categories].reverse().map((theme) => (
            <li
              className="sidebar__theme-item"
              key={theme.id}
              title={theme.title}
            >
              <button
                type="button"
                className={classNames("sidebar__theme-button", {
                  selected:
                    !isLiveGamesPage && selectedThemeId === theme.id.toString(),
                })}
                onClick={() => handleSelectTheme(theme)}
              >
                {theme.title}
              </button>
            </li>
          ))}
          <li className="sidebar__theme-item">
            <button
              type="button"
              className={classNames(
                "sidebar__theme-button sidebar__add-theme",
                {
                  selected: !isLiveGamesPage && !params,
                }
              )}
              onClick={handleCreateTheme}
            >
              <Image {...(params ? plusDisableProps : plusProps)} />새 테마
              추가하기
            </button>
          </li>
        </ul>
        {!(status?.replaceAll(`"`, "") === "SUBSCRIPTION") && (
          <div className="sidebar__subscribe">
            <p className="sidebar__subscribe-title">
              구독하고 힌트에 사진을 추가해 보세요
            </p>
            <p className="sidebar__subscribe-value">
              사진을 추가하려면 유료 구독이 필요해요
            </p>
            <button
              type="button"
              className="sidebar__subscribe-button button32"
              onClick={() => {
                window.open(subscribeLinkURL, "_blank", "noopener, noreferrer");
              }}
            >
              구독 알아보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
