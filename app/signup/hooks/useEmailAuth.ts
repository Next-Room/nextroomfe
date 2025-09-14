/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSignUpState } from "@/(shared)/atoms/signup.atom";
import useAnalytics from "@/(shared)/hooks/useAnalytics";
import { usePostSendMessage } from "@/signup/apis/postSendMessage";
import { usePostVerification } from "@/signup/apis/postVerification";

import { CodeInputPropsType, EmailAuthValueType } from "../types/SignUp";

const useEmailAuth = () => {
  const [signUpState, setSignUpState] = useSignUpState();
  const { logEvent } = useAnalytics();

  const {
    mutateAsync: postVerification,
    isError = false,
    error,
  } = usePostVerification();

  const { mutateAsync: postSendMessage } = usePostSendMessage();
  const MINUTES_IN_MS = 5 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [numbers, setNumbers] = useState(Array(6).fill("")); // 6개의 빈 문자열로 초기화된 배열

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  const browserPreventEvent = () => {
    setSignUpState({ ...signUpState, level: 1 });
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

  const { handleSubmit } = useForm<EmailAuthValueType>();

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "sign_up_email_code",
      firebase_screen_class: "sign_up_email_code",
    });
  }, []);

  const onSubmit: SubmitHandler<EmailAuthValueType> = (data) => {
    postVerification({ code: data.code, email: signUpState.email });
    logEvent("btn_click", {
      btn_name: "sign_up_email_code_btn",
    });
  };

  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
  };

  const inputProps: CodeInputPropsType = {
    numbers,
    setNumbers,
    disabled,
  };

  const errorMessage = isError && error?.response?.data?.message;
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current); // 이전 타이머 정리
    }

    const startTime = Date.now();
    setTimeLeft(MINUTES_IN_MS); // 타이머 초기화
    setDisabled(false); // 버튼 활성화

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MINUTES_IN_MS - elapsedTime;
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
        setDisabled(true); // 타이머 종료 시 버튼 비활성화
      }
    }, INTERVAL);

    timerIdRef.current = timer; // 새 타이머 ID 저장
  }, []);

  useEffect(() => {
    startTimer();
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerIdRef.current !== null) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [startTimer]);

  // 재요청 함수
  const reRequest = () => {
    postSendMessage({ email: signUpState.email });
    startTimer(); // 재요청 시 타이머 다시 시작
    setNumbers(Array(6).fill(""));
  };

  const ReRequestButtonProps = {
    onClick: reRequest,
  };

  return {
    inputProps,
    minutes,
    second,
    formProps,
    ReRequestButtonProps,
    errorMessage,
    signUpState,
  };
};

export default useEmailAuth;
