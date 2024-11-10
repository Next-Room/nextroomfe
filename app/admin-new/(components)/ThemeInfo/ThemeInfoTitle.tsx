import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import React from "react";

interface Props {
  handleOpenModal: () => void;
}
export default function ThemeInfoTitle({ handleOpenModal }: Props) {
  const selectedTheme = useSelectedThemeValue();
  return (
    <div className="theme-infomation__title">
      <div className="theme-infomation-fit" onClick={handleOpenModal}>
        <div className="title">{selectedTheme.title}</div>
        <div className="image" />
      </div>
    </div>
  );
}
