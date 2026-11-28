import { useCallback, useState } from "react";

import { subscribeLinkURL } from "@/admin/(consts)/sidebar";

import {
  isSubscriptionError,
  LiveGame,
  POLLING_INTERVAL,
  UsedHint,
  useGetLiveGames,
} from "../apis/getLiveGames";
import { getDisplayStatus, sortByUrgency } from "../helpers/liveGame";
import useNow from "../hooks/useNow";

import HintDetailDialog from "./HintDetailDialog";
import LiveGameCard from "./LiveGameCard";

export default function LiveGameBoard() {
  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
    dataUpdatedAt,
    errorUpdatedAt,
  } = useGetLiveGames();
  const now = useNow(data?.clockOffset ?? 0);
  // 1분마다 목록이 갱신되어도 열어 둔 힌트가 유지되도록 게임 객체가 아닌 필요한 값만 기억한다.
  const [selectedHint, setSelectedHint] = useState<{
    themeId: number;
    themeTitle: string;
    usedHint: UsedHint;
  } | null>(null);
  const handleHintClick = useCallback((game: LiveGame, hint: UsedHint) => {
    setSelectedHint({
      themeId: game.themeId,
      themeTitle: game.themeTitle,
      usedHint: hint,
    });
  }, []);
  const closeHintDetail = useCallback(() => setSelectedHint(null), []);

  const renderContent = () => {
    if (isSubscriptionError(error)) {
      return (
        <div className="live-games__message">
          <p className="live-games__message-title">
            구독하면 모니터링을 이용할 수 있어요
          </p>
          <p className="live-games__message-text">
            진행 중인 방의 남은 시간과 사용한 힌트를 한눈에 확인해 보세요
          </p>
          <button
            type="button"
            className="live-games__message-button button32"
            onClick={() =>
              window.open(subscribeLinkURL, "_blank", "noopener, noreferrer")
            }
          >
            구독 알아보기
          </button>
        </div>
      );
    }
    if (!data) {
      return (
        <div className="live-games__message">
          <p className="live-games__message-text">
            {isLoading
              ? "진행 중인 게임을 불러오고 있어요"
              : "현황을 불러오지 못했어요. 잠시 후 자동으로 다시 시도해요"}
          </p>
        </div>
      );
    }
    if (data.games.length === 0) {
      return (
        <div className="live-games__message">
          <p className="live-games__message-title">
            지금 진행 중인 게임이 없어요
          </p>
          <p className="live-games__message-text">
            앱에서 게임을 시작하면 최대 2분 안에 여기에 표시돼요
            <br />
            시간이 지나도 보이지 않는다면 앱을 최신 버전으로 업데이트해 주세요
          </p>
          <button
            type="button"
            className="live-games__message-button button32"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "불러오는 중" : "지금 새로고침"}
          </button>
        </div>
      );
    }
    return (
      <div className="live-games__grid">
        {sortByUrgency(data.games, now).map((game) => (
          <LiveGameCard
            key={game.sessionId}
            game={game}
            now={now}
            onHintClick={handleHintClick}
          />
        ))}
      </div>
    );
  };

  const statuses = (data?.games ?? []).map((game) =>
    getDisplayStatus(game, now)
  );
  const countOf = (...targets: string[]) =>
    statuses.filter((status) => targets.includes(status)).length;

  const lastFetchedAt = Math.max(dataUpdatedAt, errorUpdatedAt);
  const secondsUntilRefetch = Math.min(
    POLLING_INTERVAL / 1000,
    Math.ceil(
      (lastFetchedAt + POLLING_INTERVAL - (now - (data?.clockOffset ?? 0))) /
        1000
    )
  );
  const renderRefreshStatus = () => {
    if (isFetching) return "불러오는 중";
    if (secondsUntilRefetch <= 0) return "곧 자동 갱신";
    return `${secondsUntilRefetch}초 후 자동 갱신`;
  };

  return (
    <div className="live-games">
      <div className="live-games__header">
        <div>
          <h2 className="live-games__title">
            모니터링
            <span className="beta-badge">BETA</span>
          </h2>
          <p className="live-games__desc">
            진행 중인 방의 남은 시간, 힌트 사용, 기기 상태를 한눈에 확인해요
          </p>
        </div>
        <div className="live-games__actions">
          {statuses.length > 0 && (
            <ul className="live-games__summary">
              <li>
                진행 중 <strong>{countOf("playing", "urgent")}</strong>
              </li>
              <li className="is-urgent">
                종료 임박 <strong>{countOf("urgent")}</strong>
              </li>
              <li className="is-time-over">
                시간 종료 <strong>{countOf("timeOver")}</strong>
              </li>
              <li className="is-disconnected">
                연결 끊김 <strong>{countOf("disconnected")}</strong>
              </li>
            </ul>
          )}
          {!isSubscriptionError(error) && lastFetchedAt > 0 && (
            <span className="live-games__refresh-status">
              {renderRefreshStatus()}
            </span>
          )}
          {!isSubscriptionError(error) && (
            <button
              type="button"
              className={`live-games__refresh${
                isFetching ? " is-fetching" : ""
              }`}
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 3v6h-6" />
              </svg>
              새로고침
            </button>
          )}
        </div>
      </div>
      {renderContent()}
      {selectedHint && (
        <HintDetailDialog {...selectedHint} onClose={closeHintDetail} />
      )}
    </div>
  );
}
