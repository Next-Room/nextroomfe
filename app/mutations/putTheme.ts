import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import { useToastWrite } from "@/components/atoms/toast.atom";
import { apiClient } from "@/lib/reactQueryProvider";
import { QUERY_KEY } from "@/queries/getThemeList";
import { MutationConfigOptions } from "@/types";

interface Request {
  id: number;
  title: string;
  timeLimit: number;
}
type Response = void;

const URL_PATH = `/v1/theme`;
const MUTATION_KEY = [URL_PATH];

export const putTheme = async (req: Request) => {
  const res = await apiClient.put<Request, AxiosResponse<Response>>(
    URL_PATH,
    req
  );

  return res.data;
};

export const usePutTheme = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const setToast = useToastWrite();
  const info = useMutation<Response, void, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => putTheme(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);

      setToast({
        isOpen: true,
        title: "테마 정보를 수정했습니다.",
        text: "",
      });
    },
    onSettled: () => {
      //   console.log("항상 실행");
    },
    onError: (error) => {
      setToast({
        isOpen: true,
        title: `${(error as any)?.response?.data?.message || error}`,
        text: "",
      });
    },
  });

  return info;
};
