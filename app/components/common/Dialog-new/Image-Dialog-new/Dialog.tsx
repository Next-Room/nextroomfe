import React, { FormEvent, forwardRef, useRef } from "react";
import Image from "next/image";

import { useSelectedTheme } from "@/components/atoms/selectedTheme.atom";
import useClickOutside from "@/hooks/useClickOutside";
import { xProps } from "@/admin/(consts)/sidebar";
import useModal from "@/hooks/useModal";
import ModalPortal from "@/components/common/Dialog-new/ModalPortal";
import "@/components/common/Dialog-new/dialog.sass";
import useTimerImageUpload from "@/mutations/useTimerImageUpload";
import { useTimerImageValue } from "@/components/atoms/timerImage.atom";

import DialogBody from "./DialogBody";

const Dialog = forwardRef<HTMLFormElement>(() => {
  const { close } = useModal();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [selectedTheme] = useSelectedTheme();
  const { timerImage } = useTimerImageValue();
  const { handleProcess } = useTimerImageUpload();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { id } = selectedTheme;

    const submitData = {
      themeId: id,
      timerImageFile: timerImage,
    };
    try {
      await handleProcess(submitData);
    } catch (error) {
      console.error(error);
    }

    close();
  };

  useClickOutside(formRef, close);

  return (
    <ModalPortal>
      <form
        className={`theme-info-modal`}
        ref={formRef}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="theme-info-modal__header">
          <h2>타이머 배경 올리기</h2>
          <button className="close-button" type="button" onClick={close}>
            <Image {...xProps} />
          </button>
        </div>
        <DialogBody />
        <div className="theme-info-modal__footer">
          <p className="timer-preview-image-footer-text">
            힌트폰에 곧바로 적용됩니다
          </p>
          <div className="action-buttons">
            <button className="outlined_button40" type="button" onClick={close}>
              취소
            </button>
            <button className="button40" type="submit">
              등록하기
            </button>
          </div>
        </div>
      </form>
    </ModalPortal>
  );
});

export default Dialog;
