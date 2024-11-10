"use client";

import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  SIGN_UP_EMAIL,
  SIGN_UP_PLACEHOLDER,
  SIGN_UP_SUBTEXT,
} from "@/consts/components/signUp";
import "@/apis/firebase";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import Loader from "@/components/Loader/Loader";
import { usePostSendMessage } from "@/mutations/postSendMessage";
import useAnalytics from "@/hooks/useAnalytics";
import SignUpView from "./SignUpView";

interface FormValues {
  email: string;
}

function SignUp() {
  const {
    mutateAsync: postSendMessage,
    isLoading = false,
    isError = false,
    error,
  } = usePostSendMessage();
  const [errorMsg, setErrorMsg] = useState<string | undefined>(SIGN_UP_SUBTEXT);
  const ref = useRef(null);
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({ defaultValues: { email: "" } });
  useCheckSignIn();
  const emailValue = watch("email");

  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "sign_up_start",
      firebase_screen_class: "sign_up_start",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    postSendMessage(data);
    logEvent("btn_click", {
      btn_name: "sign_up_start_btn",
      btn_position: "top",
    });
  };
  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
    flexDirection: "column",
  };

  useEffect(() => {
    setTimeout(() => {
      setFocus("email");
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errors.email) {
      setErrorMsg(errors.email.message);
      return;
    }
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setErrorMsg(error?.response?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.email, isError]);

  const adminCodeProps = {
    id: "filled-adminCode",
    type: "text",
    helperText: errorMsg,
    // errors?.email && errors?.email.message,
    error: Boolean(errors?.email) || isError,
    variant: "filled",
    label: SIGN_UP_EMAIL,
    value: emailValue,
    placeholder: SIGN_UP_PLACEHOLDER,
    ref,
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

  const buttonProps = {
    type: "submit",
    variant: "contained",
    disabled: !isValid,
    sx: { marginTop: "20px" },
  };

  const SignUpViewProps = {
    formProps,
    adminCodeProps,
    buttonProps,
    isLoading,
  };

  if (isLoading) {
    return <Loader />;
  }

  return <SignUpView {...SignUpViewProps} />;
}

export default SignUp;
