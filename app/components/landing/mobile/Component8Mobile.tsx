import React from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "@/apis/firebase";

import useAnalytics from "@/hooks/useAnalytics";
import * as S from "./ComponentMobile.styled";

export default function Component8Mobile() {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_plan",
    firebase_screen_class: "homepage_plan",
  });
  const arr = [
    { name: "미니", count: 2, exCost: "19,900", nowCost: "9,900" },
    { name: "미디움", count: 5, exCost: "29,900", nowCost: "14,900" },
    { name: "라지", count: 8, exCost: "39,900", nowCost: "19,900" },
  ];
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
    <S.Wrapper8
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <S.Span>방탈출 1인 가격보다, 최저 시급보다 저렴한 가격</S.Span>
      <S.Title8>
        보다 합리적으로 선택할 수 있는
        <br />
        요금제
      </S.Title8>
      <S.BoxWrapper8>
        {arr.map(({ name, count, exCost, nowCost }) => (
          <S.Box8>
            <S.BoxTitle>{name}</S.BoxTitle>
            <S.BoxCont>
              <S.BoxDescription>
                {count}개의 테마를 등록할 수 있어요
              </S.BoxDescription>
              <S.BoxNowCost>
                {nowCost}원<span>/월</span>
              </S.BoxNowCost>
            </S.BoxCont>
            <S.BoxExCost>{exCost}원</S.BoxExCost> <br />
          </S.Box8>
        ))}
      </S.BoxWrapper8>
    </S.Wrapper8>
  );
}
