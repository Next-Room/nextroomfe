import React from "react";
import Image from "next/image";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as S from "./Component.styled";

export default function Component5() {
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
    <S.Wrapper5
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="item1 ">
        {/* <S.SubTitle3> */}
        돌발 상황에도
        <br />
        문제 없습니다
        {/* </S.SubTitle3> */}
      </div>

      <div className="item2">
        <div className="item3">
          <Image {...imgProps1} />
          <S.SubTitle4>
            손님이 실수로 앱을 종료해도
            <br />
            진행 시간에 맞게 복구합니다
          </S.SubTitle4>
        </div>
        <div className="item3">
          <Image {...imgProps2} />
          <S.SubTitle4>
            인터넷 신호가 끊겨도
            <br />
            오프라인으로 사용 가능합니다.
          </S.SubTitle4>
        </div>
      </div>
    </S.Wrapper5>
  );
}
