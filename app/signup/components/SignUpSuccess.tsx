import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import useAnalytics from "@/(shared)/hooks/useAnalytics";

import useSignUpSuccess from "../hooks/useSignUpSuccess";
import loaderJson from "../../../public/lottie/signup.json";

import HeaderLayoutComponent from "./HeaderLayout";

const SignUpSuccessComponent = () => {
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
              <p className="signup-success-title">
                이제 힌트를 등록할 수 있습니다
              </p>
              <p className="signup-success-sub-title">
                힌트 등록은 PC에서만 진행할 수 있습니다
              </p>

              <button
                className="signup-success-btn"
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
                힌트폰 앱 먼저 설치해보기
              </p>
            </div>
            <Image {...rightImageProps} />
          </Link>
        )}
      </div>
    </>
  );
};

export default SignUpSuccessComponent;
