"use client";

import { useState } from "react";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";

import useAnalytics from "@/(shared)/hooks/useAnalytics";

import loaderJson from "../../../../public/lottie/signup.json";

const ResetpwSuccessPage = () => {
  const [isFinished, setIsFinished] = useState(false);

  const router = useRouter();
  const { logEvent } = useAnalytics();

  return (
    <div className="signup-success-wrapper">
      <div className="signup-lottie-wrapper">
        <Lottie
          loop={false}
          animationData={loaderJson}
          play
          style={{ width: 112, height: 112 }}
          onComplete={() => {
            setIsFinished(true);
          }}
        />
      </div>

      <div className="signup-success-cont">
        {isFinished && (
          <>
            <p className="signup-success-title">비밀번호 변경 완료</p>
            <p className="signup-success-sub-title">
              새로운 비밀번호로 로그인해 주세요.
            </p>

            <button
              className="signup-success-btn"
              onClick={() => {
                logEvent("btn_click", {
                  btn_name: "reset_pw_login_btn",
                  btn_position: "top",
                });
                router.push("/login");
              }}
            >
              로그인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetpwSuccessPage;
