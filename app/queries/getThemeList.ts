import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

import { useSnackBarWrite } from "@/components/atoms/snackBar.atom";
import { apiClient } from "@/lib/reactQueryProvider";
import { ApiResponse, QueryConfigOptions } from "@/types";
import { useIsLoggedInValue } from "@/components/atoms/account.atom";
import { getSelectedThemeId, setSelectedThemeId } from "@/utils/storageUtil";
import { useSelectedThemeWrite } from "@/components/atoms/selectedTheme.atom";

type Request = void;
export type Theme = {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
};

export type Themes = Theme[];

type Response = ApiResponse<Themes>;

const URL_PATH = `/v1/theme`;
export const QUERY_KEY = [URL_PATH]; // TODO - 유저 id를 키에 추가해야 함

export const getThemeList = async (config?: AxiosRequestConfig) => {
  const res = await apiClient.get<Request, AxiosResponse<Response>>(URL_PATH, {
    ...config,
    params: {
      ...config?.params,
    },
  });

  return res.data;
};

export const useGetThemeList = (configOptions?: QueryConfigOptions) => {
  const setSnackBar = useSnackBarWrite();
  const isLoggedIn = useIsLoggedInValue();
  const setSelectedTheme = useSelectedThemeWrite();
  const info = useQuery<Response, AxiosError, Themes>({
    queryKey: QUERY_KEY,
    queryFn: () => getThemeList(configOptions?.config),
    ...configOptions?.options,
    select: (res) => res.data,
    enabled: !!isLoggedIn,
    onSuccess: (data) => {
      const selectedThemeId = getSelectedThemeId();
      if (data.length > 0) {
        if (!data.some((item) => item.id.toString() === selectedThemeId)) {
          setSelectedThemeId(data[data.length - 1].id);
          setSelectedTheme(data[data.length - 1]);
        } else {
          const selectedItem = data.find(
            (item) => item.id.toString() === selectedThemeId
          );
          if (selectedItem) setSelectedTheme(selectedItem);
        }
      } else setSelectedThemeId(0);
    },

    onError: (error: AxiosError) => {
      setSnackBar({
        isOpen: true,
        message: `${(error as any)?.response?.data?.message || error}`,
      });
    },
  });

  return {
    ...info,
    isInitialLoading: info.isLoading,
    isRefetching: info.isFetching && !info.isLoading,
    isLoading: info.isLoading || info.isFetching,
  };
};
