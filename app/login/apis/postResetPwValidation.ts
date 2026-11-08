import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/(shared)/lib/reactQueryProvider";

type ValidationResult = "valid" | "expired" | "error";

const postResetPasswordValidation = async (
  token: string
): Promise<ValidationResult> => {
  if (!token) return "expired";

  try {
    await apiClient.post(
      "/v1/auth/password/reset/validation",
      { token },
      {
        headers: {
          "X-Skip-Auth-Interceptor": true,
        },
      }
    );
    return "valid";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if ([400, 401].includes(error.response?.status ?? 0)) {
        return "expired";
      }
    }
    return "error";
  }
};

const useResetPasswordValidation = (token: string | null) =>
  useQuery({
    queryKey: ["resetPasswordValidation", token],
    queryFn: () => postResetPasswordValidation(token!),
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

export default useResetPasswordValidation;
