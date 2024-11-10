import { useSignUpState } from "@/components/atoms/signup.atom";
import { apiClient } from "@/lib/reactQueryProvider";
import { QUERY_KEY } from "@/queries/getHintList";
import { ApiError, ApiResponse, MutationConfigOptions } from "@/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

interface Request {
  email: string;
  password: string;
  name: string;
  isNotOpened: boolean;
  type: number;
}
interface SignUpResponse {
  code: number;
  message: string;
}
type Response = ApiResponse<SignUpResponse>;

const URL_PATH = `/v1/auth/signup`;
const MUTATION_KEY = [URL_PATH];

export const postSignUp = async (req: Request) => {
  const res = await apiClient.post<Request, AxiosResponse<Response>>(
    URL_PATH,
    req
  );

  return res.data;
};

export const usePostSignUp = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();
  const [signUpState, setSignUpState] = useSignUpState();

  const info = useMutation<Response, AxiosError<ApiError>, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => postSignUp(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      setSignUpState({ ...signUpState, level: 5 });

      // console.log("성공 시 실행")
    },
    onSettled: () => {
      //   console.log("항상 실행");
    },
    onError: (error) => {
      console.log(error);

      // setSnackBar({
      //   isOpen: true,
      //   message: `${(error as any)?.response?.data?.message || error}`,
      // });
    },
  });

  return info;
};
