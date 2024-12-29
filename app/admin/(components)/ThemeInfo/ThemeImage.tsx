import Image from "next/image";
import React, { useRef, useState } from "react";

import Tooltip from "@/admin/(components)/Tooltip/Container";
import Dialog from "@/components/common/Dialog-new/Image-Dialog-new/Dialog";
import PreviewDialog from "@/components/common/Dialog-new/Preview-Dialog-new/PreviewDialog";
import useModal from "@/hooks/useModal";

export default function ThemeImage() {
  const QuestionProps = {
    src: "/images/svg/icon_question.svg",
    alt: "gallery_image",
    width: 24,
    height: 24,
  };

  const previewProps = {
    src: "/images/svg/icon_preview.svg",
    alt: "NEXT ROOM",
    width: 120,
    height: 120,
  };
  const { open } = useModal();

  const imgInputRef = useRef<HTMLInputElement>(null);
  const handleAddImageBtnClick = () => {
    // 숨겨진 input 클릭 트리거
    // imgInputRef.current?.click();
    open(Dialog, { type: "put" });
  };
  const handlePreviewImageBtnClick = () => {
    // 숨겨진 input 클릭 트리거
    // imgInputRef.current?.click();
    open(PreviewDialog, { type: "put" });
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="theme_image__container">
      <div className="theme-image-title">
        <span>타이머 배경</span>
        <div className="theme-image__tooptip">
          <Image
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="tooptip-button"
            {...QuestionProps}
          />
          {isHovered && <Tooltip />}
        </div>
      </div>
      <div className="theme-images">
        <div className="theme-image-box">
          <Image {...previewProps} />
          <div className="theme-image-dimmed">
            <button className="button28" type="button">
              삭제
            </button>
          </div>
        </div>
        <input
          type="file"
          //   onChange={handleFileInputChange}
          accept="image/*"
          style={{ display: "none" }}
          ref={imgInputRef}
        />
        <button
          className="secondary_button40"
          onClick={handlePreviewImageBtnClick}
        >
          미리보기
        </button>
        <button className="button40" onClick={handleAddImageBtnClick}>
          배경 등록하기
        </button>
      </div>
    </div>
  );
}
