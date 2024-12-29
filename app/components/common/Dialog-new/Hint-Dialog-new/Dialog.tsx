import React, { forwardRef, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

import useClickOutside from "@/hooks/useClickOutside";
import { xProps } from "@/admin/(consts)/sidebar";
import useModal from "@/hooks/useModal";
import DialogBody from "@/components/common/Dialog-new/Hint-Dialog-new/DialogBody";
import "@/components/common/Dialog-new/dialog.sass";
import { useDeleteHint } from "@/mutations/deleteHint";
import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import { useDrawerState } from "@/components/atoms/drawer.atom";
import ModalPortal from "@/components/common/Dialog-new/ModalPortal";

interface DialogProps {
  type?: string | "";
  fn?: () => void;
}

interface FormValues {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

const Dialog = forwardRef<HTMLFormElement, DialogProps>((props) => {
  const { close, closeAll } = useModal();
  const {
    type = "",
    fn = () => {
      return;
    },
  } = props;
  const formRef = useRef<HTMLFormElement | null>(null);

  const { handleSubmit } = useForm<FormValues>();
  const [selectedHint] = useSelectedHint();

  const { mutateAsync: deleteHint } = useDeleteHint();
  const [drawer, setDrawer] = useDrawerState();

  const onSubmit: SubmitHandler<FormValues> = () => {
    const { id } = selectedHint;

    if (type === "put") {
      fn();
      close();
    } else if (type === "delete") {
      deleteHint({ id });
      close();
      fn();
      setDrawer({ ...drawer, isOpen: false });
    }
  };

  useClickOutside(formRef, closeAll);

  return (
    <ModalPortal>
      <form
        className={`theme-info-modal ${type}`}
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="theme-info-modal__header">
          <h2>
            {type === "put"
              ? "힌트 수정을 그만두시겠어요?"
              : "이 힌트를 삭제하시겠어요?"}
          </h2>
          <button className="close-button" type="button" onClick={close}>
            <Image {...xProps} />
          </button>
        </div>
        <DialogBody type={type} />
        <div className="theme-info-modal__footer">
          <div className="action-buttons">
            <button className="outlined_button40" type="button" onClick={close}>
              취소
            </button>
            <button className="button40" type="submit">
              {type === "delete" ? "삭제하기" : "그만두기"}
            </button>
          </div>
        </div>
      </form>
    </ModalPortal>
  );
});

export default Dialog;
