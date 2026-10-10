"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import useCheckSignIn from "@/(shared)/auth/hooks/useCheckSignIn";
import useAnalytics from "@/(shared)/hooks/useAnalytics";

import { FindpwValueType, TextFieldPropsType } from "../types/Findpw";
import {
  FIND_PW_EMAIL,
  FIND_PW_PLACEHOLDER,
  FIND_PW_SUBTEXT,
  RESEND_INTERVAL_MS,
} from "../consts/findpw";

import { useCountdown } from "./useCountdown";

const useFindpw = () => {
  // Mock API
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // 재발송 카운트다운
  const { remaining, isRunning, start } = useCountdown(RESEND_INTERVAL_MS);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
    watch,
  } = useForm<FindpwValueType>({
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

  const onSubmit: SubmitHandler<FindpwValueType> = async (data) => {
    if (isLoading || (isSent && isRunning)) return;
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.error("Mock 비밀번호 재설정 메일 발송:", data.email);
      setIsSent(true);
      start();
    } catch (error) {
      console.error("메일 발송 실패:", error);
    } finally {
      setIsLoading(false);
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
    helperText: errors.email?.message ?? FIND_PW_SUBTEXT,
    // errors?.email && errors?.email.message,
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
    disabled: !isSent || isRunning || isLoading,
  };

  return {
    formProps,
    textFieldInfoProps,
    isSubmitDisabled: !isValid || isLoading || isSent,
    isLoading,
    isSent,
    resendProps,
    remaining,
  };
};

export default useFindpw;
