import React from "react";
import SnackBarView from "./SnackBarView";

interface Props {
  open: boolean;
  ment: string;
  vertical: "bottom" | "top";
  horizontal: "left" | "center" | "right";
  handleClose: () => void;
}
export default function SnackBar(props: Props) {
  return <SnackBarView {...props} />;
}
