import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import { useToastWrite } from "@/components/atoms/toast.atom";
import { apiClient } from "@/lib/reactQueryProvider";
import { QUERY_KEY } from "@/queries/getThemeList";
import { MutationConfigOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

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
  const selectedTheme = useSelectedThemeValue();
  const router = useRouter();
  const info = useMutation<Response, void, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => putTheme(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      router.push(`/admin-new?themeId=${selectedTheme.id}`);

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
