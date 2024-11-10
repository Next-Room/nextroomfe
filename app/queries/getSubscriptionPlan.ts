import { useToastWrite } from "@/components/atoms/toast.atom";
import { apiClient } from "@/lib/reactQueryProvider";
import { ApiResponse, QueryConfigOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useIsLoggedInValue } from "@/components/atoms/account.atom";
import { setStatus } from "@/utils/localStorage";

// 요청 타입
type Request = void;

// 최상위 응답 타입
interface Response {
  code: number; // 상태 코드 (예: 200이면 성공)
  message: string; // 상태 메시지
  data: DataItem; // 데이터 배열
}

// 데이터 항목 타입
export interface DataItem {
  id: number; // ID
  name: string; // 이름
  status: "FREE" | "SUBSCRIPTION"; // 상태 (두 가지 값 중 하나)
  startDate: string | null; // 시작 날짜 (문자열 또는 null)
  expiryDate: string | null; // 만료 날짜 (문자열 또는 null)
  createdAt: string; // 생성 날짜
}

type ResponseType = ApiResponse<Response>;

const URL_PATH = `/v1/subscription/mypage`;
export const QUERY_KEY = [URL_PATH];

export const getSubscriptionPlan = async (config?: AxiosRequestConfig) => {
  const res = await apiClient.get<Request, AxiosResponse<Response>>(URL_PATH, {
    ...config,
    params: {
      ...config?.params,
    },
  });

  const { data } = res;
  if (data?.data) {
    setStatus(data?.data?.status);
    // console.log(data); // 구독 플랜 데이터 로그
  } else {
    console.error("구독 플랜이 없습니다:", data); // 플랜 데이터가 없는 경우 에러 로그
  }
  return res.data;
};

export const useGetSubscriptionPlan = (configOptions?: QueryConfigOptions) => {
  const setToast = useToastWrite();
  const isLoggedIn = useIsLoggedInValue();

  const info = useQuery<ResponseType, AxiosError, Response>({
    queryKey: QUERY_KEY,
    queryFn: () => getSubscriptionPlan(configOptions?.config),
    select: (res) => res.data,
    enabled: !!isLoggedIn, // 로그인 상태일 때만 요청
    ...configOptions?.options,
    onError: (error: AxiosError) => {
      setToast({
        isOpen: true,
        title: `${error.message}`,
        text: "",
      });
    },
  });

  return info;
};
