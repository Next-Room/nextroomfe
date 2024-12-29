import Image from "next/image";
import React, { ChangeEvent, useRef } from "react";

import Dialog from "@/components/common/Dialog-new/Image-Dialog-new/Dialog";
import PreviewDialog from "@/components/common/Dialog-new/Preview-Dialog-new/PreviewDialog";
import useModal from "@/hooks/useModal";
import { useTimerImageWrite } from "@/components/atoms/timerImage.atom";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import { defaultTimerImage, QuestionIconProps } from "@/admin/(consts)/sidebar";
import DeleteDialog from "@/components/common/Dialog-new/Timer-Image-Delete-Dialog/DeleteDialog";

export default function ThemeTimerImage() {
  const selectedTheme = useSelectedThemeValue();

  const isTimerImage = selectedTheme.useTimerUrl;
  const setTimerImage = useTimerImageWrite();

  const TimerImageProps = {
    src: isTimerImage ? selectedTheme.themeImageUrl! : defaultTimerImage,
    alt: "NEXT ROOM",
    width: 120,
    height: 120,
  };
  const { open } = useModal();

  const addImageInputRef = useRef<HTMLInputElement>(null);
  const fileReset = () => {
    if (addImageInputRef.current) {
      addImageInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file: File = e.target.files[0];
    setTimerImage({ timerImage: file });

    if (file) {
      open(Dialog);
    }
    fileReset();
  };
  const handleAddTimerImageBtnClick = () => {
    addImageInputRef.current?.click();
  };
  const handlePreviewBtnClick = () => {
    open(PreviewDialog);
  };

  const handleDelTimerImageBtnClick = () => {
    open(DeleteDialog);
  };

  return (
    <div className="theme_image__container">
      <div className="theme-image-title">
        <span>타이머 배경</span>
        <Image {...QuestionIconProps} />
      </div>
      <div className="theme-images">
        <div className="theme-image-box">
          <Image {...TimerImageProps} />
          {isTimerImage && (
            <div
              className="theme-image-dimmed"
              onClick={handleDelTimerImageBtnClick}
            >
              <button className="button28" type="button">
                삭제
              </button>
            </div>
          )}
        </div>
        <input
          type="file"
          onChange={handleFileInputChange}
          accept="image/*"
          style={{ display: "none" }}
          ref={addImageInputRef}
        />
        {isTimerImage ? (
          <button
            className="secondary_button40"
            onClick={handlePreviewBtnClick}
          >
            미리보기
          </button>
        ) : (
          <button className="button40" onClick={handleAddTimerImageBtnClick}>
            배경 등록하기
          </button>
        )}
      </div>
    </div>
  );
}
