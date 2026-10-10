import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useCheckSignIn from "@/(shared)/auth/hooks/useCheckSignIn";
import useChannelTalk from "@/(shared)/hooks/useChannelTalk";
import { EMAIL, PASSWORD } from "@/login/consts/logIn";
import { setCookie } from "@/(shared)/auth/helpers/cookie";

import { useGetThemeList } from "../../admin/apis/theme/getThemeList";
import { usePostLogin } from "../apis/postLogin";
import { LogInValueType } from "../types/LogIn";

const useLogIn = () => {
  const {
    mutateAsync: postLogin,
    isLoading = false,
    isError = false,
    error,
  } = usePostLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LogInValueType>({
    defaultValues: {
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
      password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "",
    },
  });
  useCheckSignIn();
  useChannelTalk();

  const formValue = watch();

  const { data: themeList, isLoading: isThemeLoading } = useGetThemeList();
  const router = useRouter();

  const onSubmit: SubmitHandler<LogInValueType> = async (data) => {
    try {
      await postLogin(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (themeList && themeList.length > 0) {
      const defaultThemeId = themeList[0].id;
      router.push(`/admin?themeId=${defaultThemeId}`);
    } else {
      router.push(`/admin`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeList, isThemeLoading]);

  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
  };

  const emailProps = {
    id: "filled-email",
    type: "text",
    helperText: errors?.email && errors?.email.message,
    error: Boolean(errors?.email) || isError,
    variant: "filled",
    label: EMAIL,
    placeholder: EMAIL,
    inputProps: {
      ...register("email", {
        required: "이메일을 입력해 주세요.",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "이메일 형식에 맞지 않습니다.",
        },
      }),
    },
    value: formValue.email,
  };

  const passwordProps = {
    id: "filled-password",
    type: "password",
    variant: "filled",
    label: PASSWORD,
    placeholder: PASSWORD,
    inputProps: {
      ...register("password", { required: "비밀번호를 입력해 주세요." }),
    },
    helperText: errors?.password && errors.password.message,
    error: Boolean(errors?.password) || isError,
    value: formValue.password,
  };

  const handleClickFindpwBtn = () => {
    router.push("/login/findpw");
  };

  const handleClickSignUpBtn = () => {
    setCookie("/login");
    router.push("/signup");
  };

  const errorMessage = isError && error?.response?.data?.message;

  return {
    formProps,
    emailProps,
    passwordProps,
    isLoading,
    errorMessage,
    handleClickFindpwBtn,
    handleClickSignUpBtn,
    isValid,
  };
};

export default useLogIn;
