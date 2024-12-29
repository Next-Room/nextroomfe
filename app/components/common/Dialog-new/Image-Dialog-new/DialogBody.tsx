import React from "react";
import Image from "next/image";

import ThemeTextField from "@/(shared)/(ThemeTextField)/Container";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import {
  hintCountTextFieldProps,
  nameTextFieldProps,
  timeTextFieldProps,
} from "@/admin/(components)/CreateTheme/createTheme";

export default function DialogBody() {
  const selectedTheme = useSelectedThemeValue();
  const previewProps = {
    src: "/images/svg/preview.svg",
    alt: "NEXT ROOM",
    width: 158,
    height: 340,
  };
  return (
    <div className="theme-info-modal__image-content">
      <span className="preview-text">배경 적용 미리보기</span>
      <Image {...previewProps} />
      <p className="preview-caption">
        *예시 이미지입니다. 앱에서 세부 설정을 진행해 주세요.
      </p>
    </div>
  );
}
