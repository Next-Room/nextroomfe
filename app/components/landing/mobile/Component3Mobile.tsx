import React from "react";
import Image from "next/image";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as S from "./ComponentMobile.styled";

export default function Component3Mobile() {
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
        ease: "easeOut",
      },
    },
  };
  

  const imgProps = {
    src: "/images/landing/landing.png",
    alt: "NEXT ROOM",
    width: 360,
    height: 228,
  };
  return (
    <S.Main3
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <S.SubTitle3>
        쉽고 빠르게 <br />
        힌트를 등록하고 수정하세요.
      </S.SubTitle3>
      <Image {...imgProps} />
    </S.Main3>
  );
}
