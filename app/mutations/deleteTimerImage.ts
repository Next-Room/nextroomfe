import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { useToastWrite } from "@/components/atoms/toast.atom";
import { apiClient } from "@/lib/reactQueryProvider";
import { QUERY_KEY } from "@/queries/getHintList";
import { MutationConfigOptions } from "@/types";

type Response = void;

const MUTATION_KEY = ["DeleteTimerImage"];
const deleteTimerImage = async (themeId: number) => {
  const URL_PATH = `/v1/theme/timer/${themeId}`;
  const res = await apiClient.delete<number, AxiosResponse<Response>>(URL_PATH);

  return res.data;
};

export const useDeleteTimerImage = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const setToast = useToastWrite();

  const info = useMutation<Response, void, number, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => deleteTimerImage(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      setToast({
        isOpen: true,
        title: "타이머 배경을 삭제했습니다.",
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
