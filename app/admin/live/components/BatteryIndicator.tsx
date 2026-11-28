import classNames from "classnames";

import type { LiveGame } from "../apis/getLiveGames";
import { isLowBattery } from "../helpers/liveGame";

interface Props {
  game: LiveGame;
}

export default function BatteryIndicator({ game }: Props) {
  const { batteryLevel } = game;
  // 배터리를 보내지 않는 이전 버전 앱이거나 기기에서 읽지 못한 경우에는 표시하지 않는다.
  if (batteryLevel === null) return null;

  return (
    <span
      className={classNames("live-game-card__battery", {
        "is-low": isLowBattery(game),
      })}
      title={`기기 배터리 ${batteryLevel}%`}
    >
      <span className="live-game-card__battery-icon" aria-hidden>
        <span
          className="live-game-card__battery-level"
          style={{ width: `${batteryLevel}%` }}
        />
      </span>
      {batteryLevel}%
    </span>
  );
}
