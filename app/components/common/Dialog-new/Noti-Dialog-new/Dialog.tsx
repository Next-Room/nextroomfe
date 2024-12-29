import React, { forwardRef, useRef } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import useModal from "@/hooks/useModal";
import ModalPortal from "@/components/common/Dialog-new/ModalPortal";
import { setLocalStorage } from "@/utils/storageUtil";

import DialogBody from "./DialogBody";

import "@/components/common/Dialog-new/dialog.sass";

interface DialogProps {
  type?: string | "";
}

const Dialog = forwardRef<HTMLFormElement, DialogProps>((props) => {
  const { close } = useModal();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { type = "" } = props;
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleViewDetailBtn = () => {
    close();
  };
  const handleCloseBtn = () => {
    if (checkboxRef.current?.checked) {
      setLocalStorage("hideDialog", "true");
    }
    close();
  };

  useClickOutside(formRef, close);

  return (
    <ModalPortal>
      <form
        className={`theme-info-modal ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="theme-info-modal__header noti">
          <h2>새로운 기능을 소개합니다✨</h2>
        </div>
        <DialogBody />
        <div className="theme-info-modal__footer">
          <div className="dont-show-again">
            <input type="checkbox" name="" id="hideDialog" ref={checkboxRef} />
            <label htmlFor="hideDialog">다시 보지 않기</label>
          </div>
          <div className="action-buttons">
            <button
              className="secondary_button40"
              type="button"
              onClick={handleViewDetailBtn}
            >
              자세히 보기
            </button>
            <button className="button40" type="button" onClick={handleCloseBtn}>
              확인
            </button>
          </div>
        </div>
      </form>
    </ModalPortal>
  );
});

export default Dialog;
