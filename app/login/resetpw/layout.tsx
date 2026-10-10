"use client";

import "./styles/resetpw.modules.sass";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const ImageProps = {
    src: "/images/svg/icon_X.svg",
    alt: "NEXT ROOM",
    width: 28,
    height: 28,
  };

  if (isWebView) {
    return (
      <>
        <div className="resetpw-wrapper" />
        {children}
      </>
    );
  }
  return (
    <>
      <div className="resetpw-wrapper">
        <button
          className="resetpw-header"
          onClick={() => {
            router.back();
          }}
        >
          <Image {...ImageProps} />
        </button>
      </div>
      {children}
    </>
  );
}
