import type { LiveGame } from "../apis/getLiveGames";

/** 앱이 60초마다 상태를 보내므로, 3번 연속 받지 못하면 연결이 끊긴 것으로 본다. */
const DISCONNECTED_THRESHOLD = 180 * 1000;
/** 남은 시간이 이보다 적으면 강조한다. */
const URGENT_THRESHOLD = 5 * 60 * 1000;
/** 배터리 잔량(%)이 이 이하면 강조한다. */
const LOW_BATTERY_THRESHOLD = 20;

export type LiveGameDisplayStatus =
  | "playing"
  | "urgent"
  | "timeOver"
  | "disconnected";

export const getDisplayStatus = (
  game: LiveGame,
  now: number
): LiveGameDisplayStatus => {
  if (now - game.lastHeartbeatAt > DISCONNECTED_THRESHOLD)
    return "disconnected";
  const remaining = game.endAt - now;
  if (game.status === "TIME_OVER" || remaining <= 0) return "timeOver";
  if (remaining <= URGENT_THRESHOLD) return "urgent";
  return "playing";
};

const URGENCY_ORDER: Record<LiveGameDisplayStatus, number> = {
  timeOver: 0,
  urgent: 1,
  playing: 2,
  disconnected: 3,
};

/** 시간 종료 → 종료 임박 → 진행 중 → 연결 끊김 순으로, 같은 상태끼리는 먼저 끝나는 방이 앞에 온다. */
export const sortByUrgency = (games: LiveGame[], now: number) =>
  [...games].sort(
    (a, b) =>
      URGENCY_ORDER[getDisplayStatus(a, now)] -
        URGENCY_ORDER[getDisplayStatus(b, now)] || a.endAt - b.endAt
  );

export const STATUS_LABEL: Record<LiveGameDisplayStatus, string> = {
  playing: "진행 중",
  urgent: "종료 임박",
  timeOver: "시간 종료",
  disconnected: "연결 끊김",
};

export const isLowBattery = (game: LiveGame) =>
  game.batteryLevel !== null && game.batteryLevel <= LOW_BATTERY_THRESHOLD;

const pad = (value: number) => value.toString().padStart(2, "0");

/** 61분 5초 → "1:01:05", 5분 3초 → "05:03" */
export const formatDuration = (millis: number) => {
  const totalSeconds = Math.max(Math.floor(millis / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(minutes)}:${pad(seconds)}`;
};

/** epoch millis → "14:05" */
export const formatClock = (millis: number) => {
  const date = new Date(millis);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** 경과 시간 → "방금 전", "3분 전", "1시간 전" */
export const formatElapsed = (millis: number) => {
  const minutes = Math.floor(millis / (60 * 1000));
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  return `${Math.floor(minutes / 60)}시간 전`;
};
