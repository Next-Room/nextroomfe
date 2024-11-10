"use client";

import Component1 from "@/components/landing/pc/Component1";
import Component2 from "@/components/landing/pc/Component2";
import Component3 from "@/components/landing/pc/Component3";
import Component4 from "@/components/landing/pc/Component4";
import Component5 from "@/components/landing/pc/Component5";
import Component6 from "@/components/landing/pc/Component6";
import Component7 from "@/components/landing/pc/Component7";
// import Component8 from "@/components/landing/pc/Component8";
import Component9 from "@/components/landing/pc/Component9";
import React, { useState, useEffect, useRef } from "react";

import Component1Mobile from "@/components/landing/mobile/Component1Mobile";
import Component2Mobile from "@/components/landing/mobile/Component2Mobile";
import Component3Mobile from "@/components/landing/mobile/Component3Mobile";
import Component4Mobile from "@/components/landing/mobile/Component4Mobile";
import Component5Mobile from "@/components/landing/mobile/Component5Mobile";
import Component6Mobile from "@/components/landing/mobile/Component6Mobile";
import Component7Mobile from "@/components/landing/mobile/Component7Mobile";
// import Component8Mobile from "@/components/landing/mobile/Component8Mobile";
import Component9Mobile from "@/components/landing/mobile/Component9Mobile";
import * as S from "./LandingView.styled";
import PcBtn from "../components/landing/pc/PcBtn";
import MobileBtn from "../components/landing/mobile/MobileBtn";

// import HomeView from "./HomeView";
type Props = Record<string, any>;
function LandingView(props: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { buttonProps, LoginLinkProps, SignUpLinkProps } = props;

  const [showBtn, setShowBtn] = useState(false); // Btn 컴포넌트의 가시성 상태
  const component1Ref = useRef<HTMLDivElement | null>(null);
  const component7Ref = useRef<HTMLDivElement | null>(null);
  const component9Ref = useRef<HTMLDivElement | null>(null); // Component9의 참조 추가

  const handleScroll = () => {
    if (component1Ref.current) {
      const rect1 = component1Ref.current.getBoundingClientRect();
      setShowBtn(rect1.bottom < 0);
    }

    if (component9Ref.current) {
      const rect9 = component9Ref.current.getBoundingClientRect();
      if (rect9.top <= window.innerHeight) {
        // Component9가 화면에 보이면 버튼 숨기기
        setShowBtn(false);
      }
    }
  };

  useEffect(() => {
    const { userAgent } = window.navigator;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
    setIsMobile(mobileRegex.test(userAgent));
    setIsLoading(true);
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트되면 이벤트 리스너를 정리
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isLoading && (
        <>
          <S.Wrapper>
            <S.LogoWrapper>
              <S.Logo />
              {!isMobile && (
                <S.BtnWrap>
                  <S.LoginButton {...LoginLinkProps}>
                    {LoginLinkProps.title}
                  </S.LoginButton>
                  <S.FreeButton {...SignUpLinkProps}>
                    {SignUpLinkProps.title}
                  </S.FreeButton>
                </S.BtnWrap>
              )}
            </S.LogoWrapper>
            {/* 조건부 렌더링을 통해 Btn 컴포넌트를 표시 */}
            {/* buttonProps를 전달하고 ref를 설정하여 DOM 요소를 참조합니다. */}
            {isMobile ? (
              <S.MobileWrapper>
                <Component1Mobile
                  ref={component1Ref}
                  buttonProps={buttonProps}
                />
                <Component2Mobile />
                <Component3Mobile />
                <Component4Mobile />
                <Component5Mobile />
                <Component6Mobile />
                <Component7Mobile ref={component7Ref} />

                {/* <Component8Mobile /> */}
                <Component9Mobile
                  ref={component9Ref}
                  buttonProps={buttonProps}
                />
                {showBtn && <MobileBtn />}
              </S.MobileWrapper>
            ) : (
              <>
                <Component1 ref={component1Ref} buttonProps={buttonProps} />
                <Component2 />
                <Component3 />
                <Component4 />
                <Component5 />
                <Component6 />
                <Component7 ref={component7Ref} />
                {/* <Component8 /> */}
                <Component9 ref={component9Ref} buttonProps={buttonProps} />
                {showBtn && <PcBtn />}
              </>
            )}
            {/* <Button {...buttonProps}>지금 바로 시작하기</Button> */}
          </S.Wrapper>
          <S.Footer> Copyright © 2023 Next room</S.Footer>
        </>
      )}
    </div>
  );
}

export default LandingView;
