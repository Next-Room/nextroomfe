import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";

interface ResetPasswordRequest {
  token: string;
  password: string;
}

type ResetPasswordResult = "success" | "expired" | "invalidPassword" | "error";

const postResetPassword = (data: ResetPasswordRequest) =>
  apiClient.post("/v1/auth/password/reset", data, {
    headers: {
      "X-Skip-Auth-Interceptor": true,
    },
  });

const useResetPassword = () => {
  const resetPasswordMutation = useMutation({
    mutationFn: postResetPassword,
  });

  const handleResetPassword = async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResult> => {
    try {
      await resetPasswordMutation.mutateAsync(data);
      return "success";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            return "invalidPassword";
          case 401:
            return "expired";
        }
      }

      return "error";
    }
  };

  return {
    handleResetPassword,
    isLoading: resetPasswordMutation.isLoading,
  };
};

export default useResetPassword;
