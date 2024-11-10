import { useToastWrite } from "@/components/atoms/toast.atom";

import { apiClient } from "@/lib/reactQueryProvider";
import { QUERY_KEY } from "@/queries/getThemeList";
import { MutationConfigOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Request {
  id: number;
}
type Response = void;

const URL_PATH = `/v1/theme`;
const MUTATION_KEY = [URL_PATH];

export const deleteTheme = async (req: Request) => {
  const res = await apiClient.delete<Request, AxiosResponse<Response>>(
    URL_PATH,
    { data: req }
  );

  return res.data;
};

export const useDeleteTheme = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const setToast = useToastWrite();

  const info = useMutation<Response, void, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => deleteTheme(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      setToast({
        isOpen: true,
        title: "테마를 삭제했습니다.",
        text: "",
      });
      // console.log("성공 시 실행")
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
