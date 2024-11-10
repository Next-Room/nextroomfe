/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { forwardRef, useRef } from "react";
import { usePutTheme } from "@/mutations/putTheme";
import { useDeleteTheme } from "@/mutations/deleteTheme";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import {
  useSelectedTheme,
  useSelectedThemeReset,
} from "@/components/atoms/selectedTheme.atom";
import {
  useCreateThemeReset,
  useCreateThemeValue,
} from "@/components/atoms/createTheme.atom";
import useClickOutside from "@/hooks/useClickOutside";
import { deleteProps, xProps } from "@/admin-new/(consts)/sidebar";
import useModal from "@/hooks/useModal";
import DialogDeleteBody from "@/components/common/Dialog-new/DialogDeleteBody";
import DialogBody from "./DialogBody";
import "@/components/common/Dialog-new/dialog.css";
import ModalPortal from "./ModalPortal";

interface DialogProps {
  type?: string | "";
}

interface FormValues {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

const Dialog = forwardRef<HTMLFormElement, DialogProps>((props) => {
  const { open, close } = useModal();
  const { type = "" } = props;
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleOpenDeleteModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    open(Dialog, { type: "delete" });
  };

  const { handleSubmit } = useForm<FormValues>();
  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const createTheme = useCreateThemeValue();
  const resetCreateTheme = useCreateThemeReset();
  const resetSelectedTheme = useSelectedThemeReset();
  const isDisabled =
    type === "put"
      ? (String(createTheme.title) === String(selectedTheme.title) &&
          Number(createTheme.timeLimit) === Number(selectedTheme.timeLimit) &&
          Number(createTheme.hintLimit) === Number(selectedTheme.hintLimit)) ||
        !(createTheme.title && createTheme.timeLimit && createTheme.hintLimit)
      : !(createTheme.title && createTheme.timeLimit && createTheme.hintLimit);

  const { mutateAsync: putTheme } = usePutTheme();
  const { mutateAsync: deleteTheme } = useDeleteTheme();

  const onSubmit: SubmitHandler<FormValues> = () => {
    const { id } = selectedTheme;

    const submitData = {
      ...createTheme,
      id,
    };

    if (type === "put") {
      putTheme(submitData);
      setSelectedTheme(submitData);
    } else if (type === "delete") {
      deleteTheme({ id });
      resetSelectedTheme();
    }
    close();
    resetCreateTheme();

    return close();
  };

  useClickOutside(formRef, close);

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
            {type === "put" ? "테마 정보 수정" : "정말로 삭제하시겠어요?"}
          </h2>
          <button className="close-button" type="button" onClick={close}>
            <Image {...xProps} />
          </button>
        </div>
        {type === "put" ? <DialogBody /> : <DialogDeleteBody />}
        <div className="theme-info-modal__footer">
          {type === "put" && (
            <button
              className="delete-button icon_button32"
              onClick={handleOpenDeleteModal}
              type="button"
            >
              <Image {...deleteProps} />
              테마 삭제하기
            </button>
          )}
          <div className="action-buttons">
            <button
              className="cancel outline_button32"
              type="button"
              onClick={close}
            >
              취소
            </button>
            <button className="button32" type="submit" disabled={isDisabled}>
              {type === "delete" ? "삭제하기" : "저장"}
            </button>
          </div>
        </div>
      </form>
    </ModalPortal>
  );
});

Dialog.defaultProps = {
  type: "",
};

export default Dialog;
