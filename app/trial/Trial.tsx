"use client";

import React, { useState, useEffect } from "react";
import { EMAIL } from "@/consts/components/trial";
import { SubmitHandler, useForm } from "react-hook-form";
import "@/apis/firebase";
import { usePostInfo } from "@/mutations/postInfo";
import useAnalytics from "@/hooks/useAnalytics";
import TrialView from "./TrialView";

interface FormValues {
  info: string;
}
function Trial() {
  const { mutate: postMutate } = usePostInfo();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "homepage_input_contact",
      firebase_screen_class: "homepage_input_contact",
    });
  }, [logEvent]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (info) => {
    setIsComplete(true);
    postMutate(info);
  };
  // const onSubmit: SubmitHandler<FormValues> = (data) => {};
  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
    flexDirection: "column",
  };

  const emailProps = {
    id: "filled-email",
    label: EMAIL,
    type: "email",
    variant: "filled",
    placeholder: "",
    ...register("info", { required: "이메일이나 연락처를 입력해 주세요." }),
    helperText: errors?.info && errors.info.message,
    // error: Boolean(errors?.email) || isError,
    sx: { backgroundColor: "#ffffff10" },
  };

  // const errorMessage = isError && error?.response?.data?.message;

  const buttonProps = {
    type: "submit",
    variant: "contained",
  };

  const TrialViewProps = {
    formProps,
    buttonProps,
    emailProps,
    // errorMessage,
    // isLoading,
    isComplete,
  };

  return <TrialView {...TrialViewProps} />;
}

export default Trial;
