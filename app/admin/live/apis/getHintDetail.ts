import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/(shared)/types";
import {
  getHintList,
  Hints,
  QUERY_KEY as HINT_LIST_QUERY_KEY,
} from "@/admin/apis/hint/getHintList";

import type { UsedHint } from "./getLiveGames";

export type HintDetail = Hints[number];

/**
 * 진행 중인 게임에서 사용한 힌트의 내용·정답을 가져온다.
 * 테마 화면과 같은 쿼리 키를 써서, 이미 받아 둔 테마의 힌트 목록이 있으면 다시 요청하지 않는다.
 */
export const useGetHintDetail = ({
  themeId,
  usedHint,
}: {
  themeId: number;
  usedHint: UsedHint;
}) =>
  useQuery<ApiResponse<Hints>, AxiosError, HintDetail | null>({
    queryKey: [...HINT_LIST_QUERY_KEY, { themeId }],
    queryFn: () => getHintList({ themeId }),
    select: (res) =>
      res.data.find((hint) => hint.id === usedHint.hintId) ?? null,
    staleTime: 60 * 1000,
  });
