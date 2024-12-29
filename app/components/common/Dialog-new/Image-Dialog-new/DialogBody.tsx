import React from "react";
import Image from "next/image";

import { useTimerImageValue } from "@/components/atoms/timerImage.atom";
import { timerPreviewLineProps } from "@/admin/(consts)/sidebar";

export default function DialogBody() {
  const { timerImage } = useTimerImageValue();
  const url = URL.createObjectURL(timerImage!);
  const uploadImageProps = {
    src: url,
    alt: "TIMER_IMAGE",
    width: 158,
    height: 340,
  };

  return (
    <div className="theme-info-modal__image-content">
      <span className="preview-text">배경 적용 미리보기</span>
      <div className="timer-preview-image-box">
        <div className="timer-dimmed-box" />
        <Image className="timer-preview-image" {...uploadImageProps} />
        <Image className="timer-preview-line" {...timerPreviewLineProps} />
      </div>
      <p className="preview-caption">
        *예시 이미지입니다. 앱에서 세부 설정을 진행해 주세요.
      </p>
    </div>
  );
}
