"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { usePostSendMessage } from "@/signup/apis/postSendMessage";
import useCheckSignIn from "@/(shared)/auth/hooks/useCheckSignIn";
import useAnalytics from "@/(shared)/hooks/useAnalytics";

import { SignUpValueType, TextFieldPropsType } from "../types/SignUp";
import { SIGN_UP_EMAIL, SIGN_UP_PLACEHOLDER } from "../consts/signUp";

const useSignUp = () => {
  const {
    mutateAsync: postSendMessage,
    isLoading = false,
    isError,
    error,
  } = usePostSendMessage();

  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpValueType>({
    mode: "onChange",
    defaultValues: { email: "" },
  });
  useCheckSignIn();

  const emailValue = watch("email");
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "sign_up_start",
      firebase_screen_class: "sign_up_start",
    });
  }, []);
  const onSubmit: SubmitHandler<SignUpValueType> = (data) => {
    postSendMessage(data);
    logEvent("btn_click", {
      btn_name: "sign_up_start_btn",
      btn_position: "top",
    });
  };
  const formProps = {
    noValidate: true,
    onSubmit: handleSubmit(onSubmit),
    autoComplete: "off",
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const errorMsg =
    errors.email?.message ??
    (isError ? error?.response?.data?.message : undefined);

  const textFieldInfoProps: TextFieldPropsType = {
    id: "filled-adminCode",
    type: "text",
    helperText: errorMsg,
    error: Boolean(errors?.email) || isError,
    variant: "filled",
    label: SIGN_UP_EMAIL,
    value: emailValue,
    placeholder: SIGN_UP_PLACEHOLDER,
    inputProps: {
      ...register("email", {
        required: "이메일을 입력해 주세요.",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "이메일 주소를 정확히 입력해 주세요.",
        },
      }),
    },
  };

  return {
    formProps,
    textFieldInfoProps,
    isValid,
    isLoading,
  };
};

export default useSignUp;
