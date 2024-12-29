import Image from "next/image";
import React from "react";

import "../../(style)/tooltip.modules.sass";
import { arrowProps, timerTooltipProps } from "@/admin/(consts)/sidebar";

export default function Container() {
  return (
    <div className="tooltip-container">
      <Image className="arrow" {...arrowProps} />
      <div className="content-container">
        <span className="content-container__title">타이머 배경이란?</span>
        <p className="content-container__content">
          힌트폰 타이머에 테마별로 원하는 배경을 넣어 우리 매장만의 힌트폰을
          제공할 수 있습니다. 타이머 배경을 설정하지 않으면 기본 이미지로
          나타납니다.
        </p>
        <div className="content-container__image">
          <Image {...timerTooltipProps} />
        </div>
      </div>
    </div>
  );
}
