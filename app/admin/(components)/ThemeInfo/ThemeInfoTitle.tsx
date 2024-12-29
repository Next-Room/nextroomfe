import Image from "next/image";
import React from "react";

import { settingProps } from "@/admin/(consts)/sidebar";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
interface Props {
  handleOpenModal: () => void;
}
export default function ThemeInfoTitleNew({ handleOpenModal }: Props) {
  const selectedTheme = useSelectedThemeValue();

  return (
    <div className="theme-infomation__title">
      <div className="title">{selectedTheme.title}</div>
      <div className="theme-infomation-text-box">
        <span className="theme-infomation-text">탈출 제한 시간</span>
        <span className="theme-infomation-content-text">
          {selectedTheme.timeLimit}분
        </span>
        <div className="dot" />
        <span className="theme-infomation-text">사용 가능한 힌트</span>
        <span className="theme-infomation-content-text">
          {selectedTheme.hintLimit}개
        </span>
      </div>
      <button onClick={handleOpenModal} className="setting-button">
        <Image {...settingProps} />
      </button>
      <div className="decoration-line" />
    </div>
  );
}
