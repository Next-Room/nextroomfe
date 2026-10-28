/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import useAnalytics from "@/(shared)/hooks/useAnalytics";

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
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const expiredRef = useRef(false);
  const expiredToken = () => {
    if (expiredRef.current) return;

    expiredRef.current = true;
    setIsExpired(true);
  };

  const {
    register,
    setFocus,
    handleSubmit,
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

  const { logEvent } = useAnalytics();
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
    if (isLoading || isExpired) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.error("Mock 비밀번호 재설정:", data.password);

      logEvent("btn_click", {
        btn_name: "reset_pw_btn",
        btn_position: "top",
      });
      router.replace("/login/resetpw/success");
    } catch (error) {
      // 토큰만료 API 응답 받았을때
      // if (error.response?.status === 410 || error.response?.data?.code==="TOKEN_EXPIRED") {
      //   setIsExpired(true);
      //   return
      // }
      console.error("비밀번호 재설정 실패:", error);
    } finally {
      setIsLoading(false);
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
    token,
    formProps,
    passwordProps,
    passwordConfirmProps,
    isValid,
    isLoading,
    isExpired,
  };
};

export default useResetpw;
