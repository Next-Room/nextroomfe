/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import useAnalytics from "@/(shared)/hooks/useAnalytics";

import useResetPasswordValidation from "../../apis/postResetPwValidation";
import useResetPassword from "../../apis/postResetPw";
import {
  SIGN_UP_PASSWORD,
  SIGN_UP_PASSWORD_CONFIRM,
} from "../../../signup/consts/signUp";
import {
  PasswordValueType,
  TextFieldPropsType,
} from "../../../signup/types/SignUp";

const useResetpw = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { logEvent } = useAnalytics();

  const {
    data: validationResult,
    isLoading: isValidationLoading,
    refetch: retryValidation,
  } = useResetPasswordValidation(token);
  const { handleResetPassword, isLoading } = useResetPassword();

  const [isResetTokenExpired, setIsResetTokenExpired] = useState(false);

  const isCheckingToken = !!token && isValidationLoading;
  const isExpired =
    !token || validationResult === "expired" || isResetTokenExpired;
  const isValidationError = validationResult === "error";

  const {
    register,
    setFocus,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordValueType>({
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  const formValue = watch();

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "reset_pw",
      firebase_screen_class: "reset_pw",
    });
  }, [logEvent]);

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 다음 인풋으로 포커스 이동
      setFocus("passwordConfirm");
    }
  };

  const onSubmit: SubmitHandler<PasswordValueType> = async (data) => {
    if (
      isLoading ||
      isCheckingToken ||
      isExpired ||
      isValidationError ||
      validationResult !== "valid" ||
      !token
    )
      return;

    const result = await handleResetPassword({
      token,
      password: data.password,
    });
    switch (result) {
      case "success":
        logEvent("btn_click", {
          btn_name: "reset_pw_btn",
          btn_position: "top",
        });
        router.replace("/login/resetpw/success");
        break;

      case "expired":
        setIsResetTokenExpired(true);
        break;

      case "invalidPassword":
        setError("password", {
          type: "server",
          message: "비밀번호 조건이 맞지 않습니다.",
        });
        break;

      default:
        setError("password", {
          type: "server",
          message: "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        });
        break;
    }
  };

  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
  };

  const passwordProps: TextFieldPropsType = {
    id: "filled-password",
    type: "password",
    helperText: errors?.password && errors?.password.message,
    error: Boolean(errors?.password),
    variant: "filled",
    label: SIGN_UP_PASSWORD,
    placeholder: SIGN_UP_PASSWORD,
    inputProps: {
      ...register("password", {
        required: "비밀번호를 입력해 주세요.",
        pattern: {
          value: /^(?=.*[0-9!@#$%^&*()+=?-]).{8,}$/,
          // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*+=-?&])[A-Za-z\d!@#$%^*+=-?&]{8,}$/,
          message: "비밀번호 조건이 맞지 않습니다.",
        },
      }),
    },
    value: formValue.password,
    onKeyDown: handleKeyDown,
  };

  const passwordConfirmProps: TextFieldPropsType = {
    id: "filled-password-confirm",
    type: "password",
    helperText: errors?.passwordConfirm && errors?.passwordConfirm.message, // 비밀번호 확인 에러 메시지
    error: Boolean(errors?.passwordConfirm), // 비밀번호 확인 에러 발생 시 에러 표시
    variant: "filled",
    label: SIGN_UP_PASSWORD_CONFIRM,
    placeholder: SIGN_UP_PASSWORD_CONFIRM,
    inputProps: {
      ...register("passwordConfirm", {
        required: "비밀번호를 다시 입력해 주세요.",
        validate: (value) =>
          value === formValue.password || "비밀번호가 일치하지 않습니다.", // 현재 필드의 값을 password와 직접 비교
      }),
    },
    value: formValue.passwordConfirm,
  };

  return {
    formProps,
    passwordProps,
    passwordConfirmProps,
    isValid,
    isLoading,
    isCheckingToken,
    isExpired,
    isValidationError,
    retryValidation,
  };
};

export default useResetpw;
