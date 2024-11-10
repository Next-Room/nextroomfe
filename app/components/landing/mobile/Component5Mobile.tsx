import React from "react";
import Image from "next/image";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as S from "./ComponentMobile.styled";

export default function Component5Mobile() {
  const imgProps1 = {
    src: "/images/landing/alarm.svg",
    alt: "NEXT ROOM",
    width: 26.52,
    height: 26.92,
  };

  const imgProps2 = {
    src: "/images/landing/wifi_off.svg",
    alt: "NEXT ROOM",
    width: 29.33,
    height: 24.51,
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const boxVariants = {
    hidden: {
      y: 50, // 시작 위치를 아래로 조정합니다.
      opacity: 0,
    },
    visible: {
      y: 0, // 최종 위치를 원래 위치로 설정합니다.
      opacity: 1,
      transition: {
        duration: 0.5,
        // "easeOut"은 애니메이션 끝 부분에서 조금 느려지는 효과를 줍니다.
        ease: "easeOut",
      },
    },
  };

  return (
    <S.Wrapper5
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <S.SubTitle33>
        돌발 상황에도
        <br />
        문제 없습니다
      </S.SubTitle33>

      <S.SubTitle4>
        <Image {...imgProps1} />
        <p>
          손님이 실수로 앱을 종료해도
          <br />
          진행 시간에 맞게 복구합니다
        </p>
      </S.SubTitle4>
      <S.SubTitle4>
        <Image {...imgProps2} />
        <p>
          인터넷 신호가 끊겨도
          <br />
          오프라인으로 사용 가능합니다.
        </p>
      </S.SubTitle4>
    </S.Wrapper5>
  );
}
