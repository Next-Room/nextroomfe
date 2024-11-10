"use client";

import axios from "axios";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  getAccessToken,
  //  removeAccessToken
} from "@/utils/localStorage";

// import { useIsLoggedInWrite } from "@/components/atoms/account.atom";
import { useSnackBarWrite } from "@/components/atoms/snackBar.atom";

const accessToken = getAccessToken();

export const apiClient = axios.create({
  withCredentials: true,
  headers: {
    ...(accessToken && {
      Authorization: `Bearer ${accessToken.replace(/^"(.*)"$/, "$1")}`,
    }),
  },
});

type ErrorResponse = {
  response: {
    data: {
      code: number;
      message: string;
    };
    status: number;
  };
};

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  // const setIsLoggedIn = useIsLoggedInWrite();
  const setSnackBar = useSnackBarWrite();

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error as ErrorResponse;
      if (response?.data?.message) {
        setSnackBar({
          isOpen: true,
          message: `${(error as any)?.response?.data?.message || error}`,
        });
      }

      // TODO: /v1/hint에서 힌트코드 에러를 400으로 받아서 우선 여기 코드를 주석처리함
      // if (response && (response.status === 401 || response.status === 400)) {
      //   delete apiClient.defaults.headers.Authorization;
      //   delete apiClient.defaults.headers.common.Authorization;
      //   removeAccessToken();
      //   setIsLoggedIn(false);
      // }

      return Promise.reject(error);
    }
  );

  const [queryClient] = useState(new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
