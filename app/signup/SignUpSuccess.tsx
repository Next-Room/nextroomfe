"use client";

import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SnackBar from "@/components/SnackBar/SnackBar";
import { useSnackBarInfo } from "@/components/atoms/snackBar.atom";
import { getCookie } from "@/utils/cookie";
import useAnalytics from "@/hooks/useAnalytics";

import loaderJson from "../../public/lottie/signup.json";

import * as S from "./SignUpSuccess.styled";

import "@/apis/firebase";

function SignUpSuccess() {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userAgent } = window.navigator;
      const mwebviewRegex = /APP_NEXTROOM_ANDROID/i;
      setIsWebView(mwebviewRegex.test(userAgent));
    }
  }, []);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [snackInfo, setSnackBarInfo] = useSnackBarInfo();
  const router = useRouter();

  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("screen_view", {
      firebase_screen: "sign_up_success",
      firebase_screen_class: "sign_up_success",
    });
  }, []);

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        setSnackBarInfo({ ...snackInfo, isOpen: false });
      }, 2000);
    }
  }, [setSnackBarInfo, isFinished, snackInfo]);

  const browserPreventEvent = () => {
    history.pushState(null, "", location.href);
    const url = isWebView ? "/" : getCookie();
    router.push(url);
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

  const rightImageProps = {
    src: "/images/svg/icon_right.svg",
    alt: "allow",
    width: 24,
    height: 24,
  };

  return (
    <S.Wrapper>
      <S.LottieWrapper>
        <Lottie
          loop={false}
          animationData={loaderJson}
          play
          style={{ width: 112, height: 112 }}
          onComplete={() => {
            setIsFinished(true);
            setSnackBarInfo({ ...snackInfo, isOpen: true });
          }}
        />
      </S.LottieWrapper>

      <S.Cont>
        {isFinished && (
          <>
            <S.Title>이제 힌트를 등록할 수 있습니다</S.Title>
            <S.SubTitle>힌트 등록은 PC에서만 진행할 수 있습니다</S.SubTitle>
            {isWebView ? (
              /*
              <S.SuccessButton
                onClick={() => {
                  logEvent(analytics, "btn_click", {
                    btn_name: "sign_up_main_btn",
                    btn_position: "top",
                  });
                  window.postMessage("close");
                }}
              >
                메인으로 돌아가기
              </S.SuccessButton>
              */
              ""
            ) : (
              <S.SuccessButton
                onClick={() => {
                  logEvent("btn_click", {
                    btn_name: "sign_up_hint_btn",
                    btn_position: "top",
                  });
                  router.push("/login");
                }}
              >
                힌트 등록하기
              </S.SuccessButton>
            )}
          </>
        )}
      </S.Cont>
      {!isWebView && isFinished && (
        <S.PlayBtn href="https://play.google.com/store/search?q=%EB%84%A5%EC%8A%A4%ED%8A%B8%EB%A3%B8&c=apps&hl=ko-KR">
          <div>
            <S.PlayTitle>Google Play 스토어에서</S.PlayTitle>
            <S.SubTitle>힌트폰 앱 먼저 설치해보기</S.SubTitle>
          </div>
          <Image {...rightImageProps} />
        </S.PlayBtn>
      )}
      {isWebView && (
        <SnackBar
          open={snackInfo.isOpen}
          ment="PC에서 힌트 등록을 진행해 주세요."
          vertical="top"
          horizontal="center"
          handleClose={() => setSnackBarInfo({ ...snackInfo, isOpen: false })}
        />
      )}
    </S.Wrapper>
  );
}

export default SignUpSuccess;
