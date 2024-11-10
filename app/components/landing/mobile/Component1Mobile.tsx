import React, { forwardRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import { setCookie } from "@/utils/cookie";

import "@/apis/firebase";

import useAnalytics from "@/hooks/useAnalytics";
import * as S from "./ComponentMobile.styled";

type Props = Record<string, any>;

const Component1Mobile = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const isSignIn = useCheckSignIn();

  const { logEvent } = useAnalytics();

  logEvent("screen_view", {
    firebase_screen: "homepage_top",
    firebase_screen_class: "homepage_top",
  });
  const { buttonProps } = props;
  const imgProps = {
    src: "/images/landing/main_image.png",
    alt: "NEXT ROOM",
    width: 360,
    height: 266,
  };
  const router = useRouter();
  const controls = useAnimation();
  const [inViewRef, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const navigateToTrial = () => {
    const url = isSignIn ? "/admin" : "/signup";
    setCookie("/");

    router.push(url);
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
    <div ref={ref}>
      <S.Wrapper1
        ref={inViewRef}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <S.SubTitle1>
          방탈출 운영이 편리해지고 테마 만족도가 올라가는
        </S.SubTitle1>
        <S.Title1>
          힌트폰 서비스 <br />
          넥스트룸
        </S.Title1>
        <Image {...imgProps} />
        <S.Btn {...buttonProps} onClick={navigateToTrial}>
          지금 바로 시작하기
        </S.Btn>
      </S.Wrapper1>
    </div>
  );
});

export default Component1Mobile;
