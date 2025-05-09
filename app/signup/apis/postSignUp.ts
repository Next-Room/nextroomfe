import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { useSignUpState } from "@/(shared)/atoms/signup.atom";
import { apiClient } from "@/(shared)/lib/reactQueryProvider";
import { ApiError, ApiResponse, MutationConfigOptions } from "@/(shared)/types";

import { QUERY_KEY } from "../../admin/apis/hint/getHintList";

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
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return info;
};
