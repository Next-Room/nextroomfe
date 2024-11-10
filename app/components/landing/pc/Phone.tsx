import React, { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

import Image from "next/image";
import "@/apis/firebase";
import * as S from "@/components/landing/pc/Component.styled";
import useAnalytics from "@/hooks/useAnalytics";

export default function Phone() {
  const { logEvent } = useAnalytics();
  logEvent("screen_view", {
    firebase_screen: "homepage_function_1",
    firebase_screen_class: "homepage_function_1",
  });
  const imgProps = {
    src: "/images/landing/hint_phone.png",
    alt: "NEXT ROOM",
    width: 316,
    height: 650,
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const opacityOffset = 500; // 낮은 값으로 설정하여 투명도 변화가 빠르게 일어나도록 함

  const opacity = useTransform(scrollYProgress, (value) => {
    const elementTop = ref.current?.offsetTop ?? 0;
    const elementHeight = ref.current?.offsetHeight ?? 0;
    const progress = (value * 100 - elementTop + elementHeight) / opacityOffset;
    return Math.max(0, Math.max(0, progress));
  });

  return (
    <S.ImgCont
      ref={ref}
      style={{
        opacity,
      }}
    >
      <Image {...imgProps} />
      <S.Title7>
        직관적으로 알 수 있는 시간
        <S.SubTitle7>
          플레이가 시작되면 남은 시간을
          <br /> 그래프와 함께 제공합니다.
          <br />
          직관적으로 진행률과 대조하여
          <br /> 남은 시간이 여유있는지, 아닌지
          <br />
          판단할 수 있습니다.
          <br />
          진행률과 대조하여 직관적으로 <br />
          판단할 수 있습니다.{" "}
        </S.SubTitle7>
      </S.Title7>
    </S.ImgCont>
  );
}
