import React, { forwardRef, useRef } from "react";
import Image from "next/image";

import useClickOutside from "@/hooks/useClickOutside";
import { xProps } from "@/admin/(consts)/sidebar";
import useModal from "@/hooks/useModal";
import "@/components/common/Dialog-new/dialog.sass";
import { useDeleteTimerImage } from "@/mutations/deleteTimerImage";
import ModalPortal from "@/components/common/Dialog-new/ModalPortal";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";

import DialogBody from "./DialogBody";

const DeleteDialog = forwardRef<HTMLFormElement>(() => {
  const { close } = useModal();
  const divRef = useRef<HTMLDivElement | null>(null);
  const selectedTheme = useSelectedThemeValue();

  const { mutateAsync: deleteTimerImage } = useDeleteTimerImage();

  const handleSubmit = async () => {
    const { id } = selectedTheme;
    await deleteTimerImage(id);

    return close();
  };

  useClickOutside(divRef, close);

  return (
    <ModalPortal>
      <div className={`theme-info-modal`} ref={divRef}>
        <div className="theme-info-modal__header">
          <h2>정말로 삭제하시겠어요?</h2>
          <button className="close-button" type="button" onClick={close}>
            <Image {...xProps} />
          </button>
        </div>
        <DialogBody />
        <div className="theme-info-modal__footer">
          <div className="action-buttons">
            <button className="outlined_button40" type="button" onClick={close}>
              취소
            </button>
            <button className="button40" type="submit" onClick={handleSubmit}>
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
});

export default DeleteDialog;
