import React, { forwardRef, useRef } from "react";
import Image from "next/image";

import useClickOutside from "@/hooks/useClickOutside";
import useModal from "@/hooks/useModal";
import ModalPortal from "@/components/common/Dialog-new/ModalPortal";
import "@/components/common/Dialog-new/dialog.sass";
import { smallXProps, timerPreviewLineProps } from "@/admin/(consts)/sidebar";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";

const PreviewDialog = forwardRef<HTMLDivElement>(() => {
  const selectedTheme = useSelectedThemeValue();
  const { close } = useModal();

  const timerPreviewProps = {
    src: selectedTheme.themeImageUrl!,
    alt: "TIMER_PREVIEW_IMAGE",
    width: 315,
    height: 682,
  };

  const divRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(divRef, close);

  return (
    <ModalPortal>
      <div className={`theme-preview-modal`} ref={divRef}>
        <p className="preview-dialog-caption">
          *예시 이미지입니다. 앱에서 세부 설정을 진행해 주세요.
        </p>
        <div className="preview-dialog-box">
          <div className="preview_image">
            <div className="timer-dimmed-box" />
            <Image className="status_bar" {...timerPreviewLineProps} />
            <Image className="mobile_preview" {...timerPreviewProps} />
          </div>
          <button
            className="icon_secondary_button40"
            type="button"
            onClick={close}
          >
            <Image {...smallXProps} />
          </button>
        </div>
      </div>
    </ModalPortal>
  );
});

export default PreviewDialog;
