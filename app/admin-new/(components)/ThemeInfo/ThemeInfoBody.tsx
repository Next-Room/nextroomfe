import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import React from "react";

interface Props {
  handleOpenModal: () => void;
}
export default function ThemeInfoBody({ handleOpenModal }: Props) {
  const selectedTheme = useSelectedThemeValue();

  const themeInfo = [
    {
      title: "탈출 제한 시간",
      content: `${selectedTheme.timeLimit}분`,
    },
    {
      title: "사용 가능한 힌트",
      content: `${selectedTheme.hintLimit}개`,
    },
  ];

  return (
    <div className="theme-infomation__body">
      <div className="theme-infomation-container">
        {themeInfo.map((info) => (
          <button
            type="button"
            className="theme-infomation-box"
            onClick={handleOpenModal}
            key={`${info.title}`}
          >
            <div className="theme-infomation-text">{info.title}</div>
            <div className="theme-infomation-content-text">{info.content}</div>
            <div className="theme-infomation-modify-text">수정</div>
          </button>
        ))}
      </div>
    </div>
  );
}
