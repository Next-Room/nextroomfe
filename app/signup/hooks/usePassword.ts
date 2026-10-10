/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSignUpState } from "@/(shared)/atoms/signup.atom";
import useAnalytics from "@/(shared)/hooks/useAnalytics";

import { SIGN_UP_PASSWORD, SIGN_UP_PASSWORD_CONFIRM } from "../consts/signUp";
import { PasswordValueType, TextFieldPropsType } from "../types/SignUp";

const usePassword = () => {
  const [signUpState, setSignUpState] = useSignUpState();
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

  const browserPreventEvent = () => {
    setSignUpState({ ...signUpState, level: 2 });
  };

  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", () => {
      browserPreventEvent();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        browserPreventEvent();
      });
    };
  }, []);

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

  const onSubmit: SubmitHandler<PasswordValueType> = (data) => {
    setSignUpState({ ...signUpState, password: data.password, level: 4 });
    logEvent("btn_click", {
      btn_name: "sign_up_password_btn",
      btn_position: "top",
    });
  };

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "sign_up_password",
      firebase_screen_class: "sign_up_password",
    });
  }, []);

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
  };
};

export default usePassword;
