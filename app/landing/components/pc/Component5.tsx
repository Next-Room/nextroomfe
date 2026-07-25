import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useCheckSignIn from "@/(shared)/auth/hooks/useCheckSignIn";
import useAnalytics from "@/(shared)/hooks/useAnalytics";
import { handleClickGoogle } from "@/(shared)/auth/hooks/useAuth";
import { setCookie } from "@/(shared)/auth/helpers/cookie";

export default function Component5() {
  const isSignIn = useCheckSignIn();

  const { logEvent } = useAnalytics();

  const router = useRouter();

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const navigateToTrial = () => {
    if (isSignIn) {
      router.push("/admin");
    } else {
      handleClickGoogle();
    }
    setCookie("/");
    logEvent("btn_click", {
      btn_name: "homepage_start_free_trial_click",
      btn_position: "top",
    });
  };

  const boxVariants = {
    hidden: {
      y: 100, // 시작 위치를 아래로 조정합니다.
      opacity: 0,
    },
    visible: {
      y: 0, // 최종 위치를 원래 위치로 설정합니다.
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="pc-wrapper5"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="pc-sub-title3">알맞은 플랜을 합리적으로 선택하세요.</div>
      <div className="pc-plan-wrapper">
        <div className="pc-plan-box">
          <div className="pc-plan-item">
            <div className="pc-plan-title">무료</div>
            <div className="pc-plan-content">
              <ul>
                <li>기본 힌트폰 기능 제공</li>
                <li>배경화면 커스텀 1개 등록 가능</li>
              </ul>
            </div>
            <div className="pc-plan-price">
              <div className="line-price">29,900원</div>
              <div>
                0원<span className="small-price">/월</span>
              </div>
            </div>
            <button className="pc-plan-btn" onClick={navigateToTrial}>
              시작하기
            </button>
          </div>
        </div>
        <div className="pc-plan-box">
          <div className="pc-plan-item">
            <div className="pc-plan-title">멤버쉽</div>
            <div className="pc-plan-content">
              <ul>
                <li>기본 힌트폰 기능 제공</li>
                <li>힌트 설명에 사진 첨부 가능</li>
                <li>배경화면 커스텀 무제한 등록 가능</li>
              </ul>
            </div>
            <div className="pc-plan-price">
              <div className="line-price">49,900원</div>
              <div>
                29,900원<span className="small-price">/월</span>
              </div>
            </div>
            <button
              className="pc-plan-btn"
              onClick={() =>
                window.open(
                  "https://nextroom-official.notion.site/38c311947d1d80ffa8d2e13f6c31f8d5", // 넥스트룸 유료 기능 소개 페이지
                  "_blank"
                )
              }
            >
              구독 알아보기
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
