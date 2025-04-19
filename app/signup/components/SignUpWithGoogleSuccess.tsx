"use client";

import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import useAnalytics from "@/(shared)/hooks/useAnalytics";

import useSignUpSuccess from "../hooks/useSignUpSuccess";
import loaderJson from "../../../public/lottie/signup.json";

import HeaderLayoutComponent from "./HeaderLayout";

const SignUpWithGoogleSuccessComponent = () => {
  const {
    isWebView,
    isFinished,
    setIsFinished,
    setSnackBarInfo,
    snackInfo,
    rightImageProps,
  } = useSignUpSuccess();
  const router = useRouter();
  const { logEvent } = useAnalytics();

  return (
    <>
      <HeaderLayoutComponent />

      <div className="signup-success-wrapper">
        <div className="signup-lottie-wrapper">
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
        </div>

        <div className="signup-success-cont">
          {isFinished && (
            <>
              <p className="signup-success-title">넥스트룸 회원가입 완료!</p>
              <p className="signup-success-sub-title">
                이제 힌트를 등록할 수 있습니다
              </p>

              <div className="signup-success-btn-box">
                <button
                  className="signup-success-btn signup-move-admin-btn"
                  onClick={() => {
                    logEvent("btn_click", {
                      btn_name: "sign_up_hint_btn",
                      btn_position: "top",
                    });

                    router.push("/login");
                  }}
                >
                  힌트 등록하기
                </button>
                <button
                  className="signup-success-btn"
                  onClick={() => {
                    logEvent("btn_click", {
                      btn_name: "sign_up_guide_btn",
                      btn_position: "top",
                    });
                  }}
                >
                  <Link
                    href="https://held-notebook-420.notion.site/134ed57b9c574733b31feab0ea5c36a5"
                    target="_blank"
                  >
                    가이드 보기
                  </Link>
                </button>
              </div>
            </>
          )}
        </div>
        {!isWebView && isFinished && (
          <Link
            className="signup-play-btn"
            href="https://play.google.com/store/search?q=%EB%84%A5%EC%8A%A4%ED%8A%B8%EB%A3%B8&c=apps&hl=ko-KR"
            target="_blank"
          >
            <div>
              <p className="signup-play-title">Google Play 스토어에서</p>
              <p className="signup-success-sub-title">
                넥스트룸 힌트폰 앱 설치하기
              </p>
            </div>
            <Image {...rightImageProps} />
          </Link>
        )}
      </div>
    </>
  );
};

export default SignUpWithGoogleSuccessComponent;
