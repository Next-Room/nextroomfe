import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleDialogClose: () => void;
  content: any;
}

const CANCEL = "취소";
const DELETE = "삭제하기";

function DeleteDialogView(props: Props) {
  const { open, handleDialogClose, content } = props;

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle style={{ color: "white" }} id="alert-dialog-title">
        {content.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>{CANCEL}</Button>
        <Button onClick={content.handleDialog} autoFocus>
          {DELETE}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialogView;
