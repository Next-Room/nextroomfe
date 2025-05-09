import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { useToastWrite } from "@/(shared)/atoms/toast.atom";
import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { MutationConfigOptions } from "@/(shared)/types";
import { QUERY_KEY } from "@/admin/apis/hint/getHintList";

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
    },
    onError: (error: unknown) => {
      setToast({
        isOpen: true,
        title: `${
          (error as AxiosError<{ message?: string }>)?.response?.data
            ?.message || error
        }`,
        text: "",
      });
    },
  });

  return info;
};
