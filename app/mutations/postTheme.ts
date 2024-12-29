import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";

import { useToastWrite } from "@/components/atoms/toast.atom";
import { apiClient } from "@/lib/reactQueryProvider";
import { QUERY_KEY } from "@/queries/getThemeList";
import { MutationConfigOptions } from "@/types";

interface Request {
  title: string;
  timeLimit: number;
}

export interface PostThemeResponseType<T = any, D = any> {
  id: number;
  data: T;
  status: number;
  statusText: string;
  code: number;
  message: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
}

const URL_PATH = `/v1/theme`;
const MUTATION_KEY = [URL_PATH];

export const postTheme = async (
  req: Request
): Promise<AxiosResponse<PostThemeResponseType>> => {
  const res = await apiClient.post<
    Request,
    AxiosResponse<PostThemeResponseType>
  >(URL_PATH, req);
  return res;
};

export const usePostTheme = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const setToast = useToastWrite();

  const info = useMutation<
    AxiosResponse<PostThemeResponseType>,
    void,
    Request,
    void
  >({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => postTheme(req),
    ...configOptions?.options,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(QUERY_KEY);
      setToast({
        isOpen: true,
        title: "테마를 추가했습니다.",
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
