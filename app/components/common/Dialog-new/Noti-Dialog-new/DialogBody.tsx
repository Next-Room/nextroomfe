import React from "react";
import Image from "next/image";

import { notiImageProps } from "@/admin/(consts)/sidebar";

export default function DialogBody() {
  const previewProps = {
    src: "/images/svg/preview.svg",
    alt: "NEXT ROOM",
    width: 158,
    height: 340,
  };

  return (
    <div className="theme-info-modal__noti-content">
      <Image {...notiImageProps} />
      <div className="theme-info-modal__feature-description">
        <span className="theme-info-modal__feature-description__title">
          타이머 배경
        </span>
        <p className="theme-info-modal__feature-description__summary">
          타이머에 원하는 배경을 넣어보세요
        </p>
        <p className="theme-info-modal__feature-description__detail">
          기본 배경 대신 방탈출 테마 포스터를 등록하여 타이머 배경을 커스텀 할
          수 있습니다.
          <br />각 테마의 독특한 분위기를 더욱 살리고, 플레이어들에게 몰입감을
          제공해보세요.
        </p>
      </div>
    </div>
  );
}
