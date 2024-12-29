"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useSignUpValue } from "@/components/atoms/signup.atom";
import { getCookie } from "@/utils/cookie";

import * as S from "./SignUpView.styled";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userAgent } = window.navigator;
      const mwebviewRegex = /APP_NEXTROOM_ANDROID/i;
      setIsWebView(mwebviewRegex.test(userAgent));
    }
  }, []);
  const router = useRouter();
  const pathName = getCookie();

  const ImageProps = {
    src: "/images/svg/icon_X.svg",
    alt: "NEXT ROOM",
    width: 28,
    height: 28,
  };
  const useSignUpState = useSignUpValue();

  if (isWebView) {
    return (
      <>
        <S.Wrapper />
        {children}
      </>
    );
  }
  return (
    <>
      <S.Wrapper>
        <S.Header
          onClick={() => {
            if (useSignUpState.level === 1) {
              router.push(pathName);
            }
            router.back();
          }}
        >
          <Image {...ImageProps} />
        </S.Header>
      </S.Wrapper>
      {children}
    </>
  );
}
