import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonBaseProps = Pick<
  MuiButtonProps,
  "variant" | "size" | "disabled" | "startIcon"
>;

export interface ButtonProps extends ButtonBaseProps {
  // eslint-disable-next-line react/require-default-props
  label?: string;
  // eslint-disable-next-line react/require-default-props
  backgroundColor?: string; // 새로운 prop 추가
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  width?: string;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  height?: string;
  // eslint-disable-next-line react/require-default-props
  fontWeight?: string;
}

export function Button({
  label,
  variant = "contained",
  disabled = false,
  backgroundColor = "white", // 새로운 prop
  width = "360px",
  height = "56px",
  fontWeight = "500",
  startIcon 
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      style={{ backgroundColor, width, height, fontWeight }} // style prop을 사용하여 배경색 설정
      disabled={disabled}
      startIcon={startIcon}
    >
      {label}
    </MuiButton>
  );
}
