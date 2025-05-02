"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSignUpValue } from "@/(shared)/atoms/signup.atom";
import { getCookie } from "@/(shared)/auth/helpers/cookie";
import { removeAccessToken } from "@/(shared)/auth/storageUtil";

const HeaderLayoutComponent = () => {
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

  return (
    <>
      <div className="signup-wrapper">
        {!isWebView && (
          <button
            className="signup-header"
            onClick={() => {
              if (useSignUpState.level === 5) {
                router.push("/login");
                return;
              }
              if (useSignUpState.level === 1) {
                router.push(pathName);
              }
              if (window.location.search) {
                removeAccessToken();
                router.push("/login");
                return;
              }
              router.back();
            }}
          >
            <Image {...ImageProps} />
          </button>
        )}
      </div>
    </>
  );
};

export default HeaderLayoutComponent;
