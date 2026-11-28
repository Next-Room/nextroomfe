import { useEffect } from "react";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { focusManager, useQuery } from "@tanstack/react-query";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiResponse } from "@/(shared)/types";
import { useIsLoggedInValue } from "@/(shared)/atoms/account.atom";

type Request = void;

export type LiveGameStatus = "PLAYING" | "TIME_OVER";

export type UsedHint = {
  hintId: number;
  hintCode: string;
  progress: number;
  openedAt: number; // 서버 기준 epoch millis
  answerOpened: boolean;
};

export type LiveGame = {
  sessionId: string;
  themeId: number;
  themeTitle: string;
  timeLimitInMinute: number;
  hintLimit: number; // -1 이면 무제한
  usedHintCount: number;
  status: LiveGameStatus;
  endAt: number; // 서버 기준 epoch millis
  lastHeartbeatAt: number; // 서버 기준 epoch millis
  batteryLevel: number | null; // 마지막으로 받은 기기 배터리 잔량(%), 알 수 없으면 null
  hints: UsedHint[];
};

export type LiveGames = {
  serverTime: number;
  games: LiveGame[];
};

/**
 * 서버 응답에 브라우저와 서버의 시계 차이(serverTime - 브라우저 시각)를 더한 값.
 * 남은 시간은 브라우저에서 매초 계산하므로 이 차이로 보정한다.
 */
export type LiveGamesWithClockOffset = LiveGames & { clockOffset: number };

type Response = ApiResponse<LiveGames>;

const URL_PATH = `/v1/live-game`;
export const QUERY_KEY = [URL_PATH];
const POLLING_INTERVAL = 60 * 1000;

export const getLiveGames = async (config?: AxiosRequestConfig) => {
  const res = await apiClient.get<Request, AxiosResponse<Response>>(URL_PATH, {
    ...config,
    params: {
      ...config?.params,
    },
  });

  return res.data;
};

export const isSubscriptionError = (error: AxiosError | null) =>
  error?.response?.status === 403;

export const useGetLiveGames = () => {
  const isLoggedIn = useIsLoggedInValue();

  const query = useQuery<LiveGamesWithClockOffset, AxiosError>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await getLiveGames();
      return { ...data, clockOffset: data.serverTime - Date.now() };
    },
    enabled: !!isLoggedIn,
    retry: (failureCount, error) =>
      !isSubscriptionError(error) && failureCount < 2,
    keepPreviousData: true,
  });

  // refetchInterval 은 수동 새로고침을 해도 주기가 초기화되지 않아서, 마지막 요청이 끝난
  // 시점부터 다시 1분을 세도록 직접 타이머를 건다.
  const { dataUpdatedAt, errorUpdatedAt, error, refetch } = query;
  const lastFetchedAt = Math.max(dataUpdatedAt, errorUpdatedAt);
  // 구독하지 않은 매장은 다시 요청해도 결과가 같으므로 폴링을 멈춘다.
  const shouldPoll = !!isLoggedIn && !isSubscriptionError(error);

  useEffect(() => {
    if (!shouldPoll) return;
    const timer = setTimeout(() => {
      // 다른 탭에 있을 때는 건너뛰고, 돌아오면 refetchOnWindowFocus 가 다시 불러온다.
      if (focusManager.isFocused()) refetch();
    }, POLLING_INTERVAL);
    return () => clearTimeout(timer);
  }, [shouldPoll, lastFetchedAt, refetch]);

  return query;
};
