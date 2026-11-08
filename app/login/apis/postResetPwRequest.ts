import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";

interface ResetPasswordRequest {
  email: string;
  clientUrl?: string;
}

interface ResetPasswordError {
  code: number;
  message: string;
}

type ResetPasswordResult =
  | "success"
  | "invalidEmail"
  | "sendFailed"
  | "notFound"
  | "google"
  | "tooManyRequests"
  | "error";

const postResetPasswordRequest = (data: ResetPasswordRequest) => {
  const hostname = window.location.hostname;

  const clientUrl =
    hostname === "localhost"
      ? "http://localhost:3000"
      : hostname === "dev.nextroom.co.kr"
      ? "https://dev.nextroom.co.kr"
      : undefined;

  return apiClient.post("/v1/auth/password/reset-requests", {
    ...data,
    ...(clientUrl && { clientUrl }),
  });
};

const useResetPasswordRequest = () => {
  const resetPasswordMutation = useMutation({
    mutationFn: postResetPasswordRequest,
  });

  const handleResetPasswordRequest = async (
    email: string
  ): Promise<ResetPasswordResult> => {
    try {
      await resetPasswordMutation.mutateAsync({ email });
      return "success";
    } catch (error) {
      const axiosError = error as AxiosError<ResetPasswordError>;
      const status = axiosError.response?.status;
      const message = axiosError.response?.data?.message;

      switch (status) {
        case 400:
          return message === "이메일 형식이 올바르지 않습니다."
            ? "invalidEmail"
            : "sendFailed";
        case 404:
          return "notFound";
        case 409:
          return "google";
        case 429:
          return "tooManyRequests";
        default:
          return "error";
      }
    }
  };

  return {
    handleResetPasswordRequest,
    isLoading: resetPasswordMutation.isPending,
  };
};

export default useResetPasswordRequest;
