"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import useCheckSignIn from "@/(shared)/auth/hooks/useCheckSignIn";
import useAnalytics from "@/(shared)/hooks/useAnalytics";
import { FindpwResultType } from "@/login/types/LogIn";
import useResetPasswordRequest from "@/login/apis/postResetPwRequest";

import {
  SignUpValueType,
  TextFieldPropsType,
} from "../../../signup/types/SignUp";
import {
  FIND_PW_EMAIL,
  FIND_PW_PLACEHOLDER,
  RESEND_INTERVAL_MS,
} from "../../../signup/consts/signUp";

import { useCountdown } from "./useCountdown";

const useFindpw = () => {
  const [resultType, setResultType] = useState<FindpwResultType>(null);
  const { handleResetPasswordRequest, isLoading } = useResetPasswordRequest();

  // 재발송 카운트다운
  const { remaining, isRunning, start } = useCountdown(RESEND_INTERVAL_MS);

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpValueType>({
    mode: "onChange",
    defaultValues: { email: "" },
  });
  useCheckSignIn();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const emailValue = watch("email");
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "find_pw",
      firebase_screen_class: "find_pw",
    });
  }, [logEvent]);

  const onSubmit: SubmitHandler<SignUpValueType> = async (data) => {
    if (isLoading || (resultType === "success" && isRunning)) return;

    clearErrors("email");
    const result = await handleResetPasswordRequest(data.email);

    switch (result) {
      case "success":
        setResultType("success");
        start();
        break;
      case "invalidEmail":
        setError("email", {
          type: "server",
          message: "이메일 형식이 올바르지 않습니다.",
        });
        break;
      case "sendFailed":
        setError("email", {
          type: "server",
          message: "이메일이 전송되지 않았습니다. 잠시 후 다시 시도해 주세요.",
        });
        break;
      case "notFound":
        setResultType("notFound");
        break;
      case "google":
        setResultType("google");
        break;
      case "tooManyRequests":
        start();
        break;

      default:
        setError("email", {
          type: "server",
          message: "잠시 후 다시 시도해 주세요.",
        });
    }
  };

  const formProps = {
    noValidate: true,
    onSubmit: handleSubmit(onSubmit),
    autoComplete: "off",
  };

  const textFieldInfoProps: TextFieldPropsType = {
    id: "filled-adminCode",
    type: "text",
    helperText: errors.email?.message,
    error: Boolean(errors?.email),
    variant: "filled",
    label: FIND_PW_EMAIL,
    value: emailValue,
    placeholder: FIND_PW_PLACEHOLDER,
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

  const resendProps = {
    type: "button" as const,
    onClick: handleSubmit(onSubmit),
    disabled: resultType !== "success" || isRunning || isLoading,
  };

  return {
    formProps,
    textFieldInfoProps,
    isSubmitDisabled: !isValid || isLoading || resultType === "success",
    isLoading,
    resultType,
    resendProps,
    remaining,
  };
};

export default useFindpw;
