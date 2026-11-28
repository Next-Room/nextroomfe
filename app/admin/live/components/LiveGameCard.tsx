import classNames from "classnames";

import type { LiveGame, UsedHint } from "../apis/getLiveGames";
import {
  formatClock,
  formatDuration,
  formatElapsed,
  getDisplayStatus,
  STATUS_LABEL,
} from "../helpers/liveGame";

import BatteryIndicator from "./BatteryIndicator";

interface Props {
  game: LiveGame;
  now: number;
  onHintClick: (game: LiveGame, hint: UsedHint) => void;
}

export default function LiveGameCard({ game, now, onHintClick }: Props) {
  const status = getDisplayStatus(game, now);
  const remaining = game.endAt - now;
  const isTimeOver = remaining <= 0 || game.status === "TIME_OVER";
  const totalMillis = game.timeLimitInMinute * 60 * 1000;
  const elapsedRatio = Math.min(Math.max(1 - remaining / totalMillis, 0), 1);
  const isUnlimitedHint = game.hintLimit === -1;
  const recentHints = [...game.hints].sort((a, b) => b.openedAt - a.openedAt);

  return (
    <article className={classNames("live-game-card", `is-${status}`)}>
      <header className="live-game-card__header">
        <h3 className="live-game-card__title" title={game.themeTitle}>
          {game.themeTitle}
        </h3>
        <span className="live-game-card__badge">
          <i className="live-game-card__badge-dot" />
          {STATUS_LABEL[status]}
        </span>
      </header>

      <div className="live-game-card__timer">
        <div className="live-game-card__timer-row">
          <strong
            className="live-game-card__timer-value"
            title={isTimeOver ? "초과 시간" : "남은 시간"}
          >
            {isTimeOver
              ? `+${formatDuration(now - game.endAt)}`
              : formatDuration(remaining)}
          </strong>
          <span className="live-game-card__hint-count">
            힌트 <strong>{game.usedHintCount}</strong> /{" "}
            {isUnlimitedHint ? "무제한" : game.hintLimit}
          </span>
        </div>
        <div className="live-game-card__progress">
          <div
            className="live-game-card__progress-bar"
            style={{ width: `${elapsedRatio * 100}%` }}
          />
        </div>
        <div className="live-game-card__caption-row">
          <span className="live-game-card__timer-caption">
            {formatClock(game.endAt)} 종료 · 총 {game.timeLimitInMinute}분
          </span>
          <BatteryIndicator game={game} />
        </div>
      </div>

      {recentHints.length > 0 ? (
        <ul className="live-game-card__hint-list">
          {recentHints.map((hint) => (
            <li key={hint.hintId}>
              <button
                type="button"
                className={classNames("live-game-card__hint", {
                  "is-answer-opened": hint.answerOpened,
                })}
                title={`${formatClock(hint.openedAt)} 사용${
                  hint.answerOpened ? " · 정답 확인" : ""
                } · 눌러서 힌트 내용 보기`}
                onClick={() => onHintClick(game, hint)}
              >
                <span className="live-game-card__hint-code">
                  {hint.hintCode}
                </span>
                <span className="live-game-card__hint-progress">
                  {hint.progress}%
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="live-game-card__hint-empty">사용한 힌트 없음</p>
      )}

      {status === "disconnected" && (
        <p className="live-game-card__notice">
          {formatElapsed(now - game.lastHeartbeatAt)}부터 앱 상태를 받지 못하고
          있어요. 기기의 네트워크 연결을 확인해 주세요.
        </p>
      )}
    </article>
  );
}
