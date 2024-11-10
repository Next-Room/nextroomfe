import React from "react";
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

type DialogBaseProps = Pick<MuiDialogProps, "open">;

export interface DialogProps extends DialogBaseProps {
  label: string;
  content: string; // 대화 상자 내용을 추가할 수 있습니다.
  onClose: () => void; // 대화 상자를 닫을 때 호출할 함수를 추가할 수 있습니다.
}

export function Dialog({
  label,
  open,
  content,
  onClose,
  ...rest
}: DialogProps) {
  return (
    <MuiDialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>{label}</DialogTitle>

      <DialogContent >{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>

        <Button onClick={onClose}>그만두기</Button>
      </DialogActions>
    </MuiDialog>
  );
}
