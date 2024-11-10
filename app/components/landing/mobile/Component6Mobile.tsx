import React from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as S from "./ComponentMobile.styled";

export default function Component6Mobile() {
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
    <S.Wrapper
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <S.Span>넥스트룸은</S.Span>
      <S.Title6>
        방탈출에만 몰입할 수 있는
        <br />
        특별한 기능을 제공합니다.
      </S.Title6>
      <S.SubTitle6>
        직관적으로 확인할 수 있는 진행률부터 힌트 확인까지, <br />
        최소한의 동작으로 기능을 실행합니다. <br />
        <br />
        테마 몰입에 방해되는 요소는 최소한으로 줄이고 <br />
        편의성을 높은 기능들을 준비했죠.
      </S.SubTitle6>
    </S.Wrapper>
  );
}
