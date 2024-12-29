"use client";

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/consts/components/login";
import { useIsLoggedInValue } from "@/components/atoms/account.atom";
import { usePostLogin } from "@/mutations/postLogin";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import useChannelTalk from "@/hooks/useChannelTalk";
import { setCookie } from "@/utils/cookie";
import { useGetThemeList } from "@/queries/getThemeList";

import LoginView from "./LoginView";

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const isLoggedIn = useIsLoggedInValue();
  const {
    mutateAsync: postLogin,
    isLoading = false,
    isError = false,
    error,
  } = usePostLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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
  }, [isThemeLoading]);

  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
    flexDirection: "column",
  };

  const adminCodeProps = {
    id: "filled-adminCode",
    type: "text",
    helperText: errors?.email && errors?.email.message,
    error: Boolean(errors?.email) || isError,
    variant: "filled",
    label: ADMIN_EMAIL,
    placeholder: ADMIN_EMAIL,
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
    label: ADMIN_PASSWORD,
    placeholder: ADMIN_PASSWORD,
    inputProps: {
      ...register("password", { required: "비밀번호를 입력해 주세요." }),
    },
    helperText: errors?.password && errors.password.message,
    error: Boolean(errors?.password) || isError,
    value: formValue.password,
  };

  const buttonProps = {
    type: "submit",
    variant: "contained",
  };

  const logoProps = {
    src: "/images/svg/logo.svg",
    alt: "NEXT ROOM",
    width: 184,
    height: 26,
  };

  const contectProps = {
    type: "button",
    onClick: () => {
      setCookie("/login");
      router.push("/signup");
    },
  };

  const errorMessage = isError && error?.response?.data?.message;

  const LoginViewProps = {
    formProps,
    adminCodeProps,
    passwordProps,
    buttonProps,
    logoProps,
    isLoading,
    errorMessage,
    contectProps,
  };

  return <LoginView {...LoginViewProps} />;
}

export default Login;
