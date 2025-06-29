import { forwardRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "@/(shared)/utils/firebase";
import { setCookie } from "@/(shared)/auth/helpers/cookie";
import { handleClickGoogle } from "@/(shared)/auth/hooks/useAuth";

import useCheckSignIn from "../../../(shared)/auth/hooks/useCheckSignIn";
import useAnalytics from "../../../(shared)/hooks/useAnalytics";

const Component1Mobile = forwardRef<HTMLDivElement>((_, ref) => {
  const isSignIn = useCheckSignIn();

  const { logEvent } = useAnalytics();

  logEvent("screen_view", {
    firebase_screen: "homepage_top",
    firebase_screen_class: "homepage_top",
  });

  const imgProps = {
    src: "/images/landing/main_image.png",
    alt: "NEXT ROOM",
    width: 360,
    height: 266,
  };
  const router = useRouter();
  const controls = useAnimation();
  const [inViewRef, inView] = useInView();

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
    <div ref={ref}>
      <motion.div
        className="wrapper1"
        ref={inViewRef}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <p className="sub-title1">
          방탈출 운영이 편리해지고 테마 만족도가 올라가는
        </p>
        <h1 className="title1">
          힌트폰 서비스 <br />
          넥스트룸
        </h1>
        <Image {...imgProps} />
        <button className="btn" type="button" onClick={navigateToTrial}>
          지금 바로 시작하기
        </button>
      </motion.div>
    </div>
  );
});

export default Component1Mobile;
