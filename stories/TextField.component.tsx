import React from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

type TextFieldBaseProps = Pick<
  MuiTextFieldProps,
  | "label"
  | "variant"
  | "size"
  | "color"
  | "disabled"
  | "error"
  | "placeholder"
  | "helperText"
  | "hiddenLabel"
>;

export interface TextFieldProps extends TextFieldBaseProps {
  label: string;
  height: string;
}

export function TextField({
  label = "제목",
  variant = "filled",
  size = "medium",
  height = "82px",
  color = "primary",
  disabled = false,
  error = false,
  placeholder = "미리보기",
  helperText = "subText",
  hiddenLabel = false,
}: TextFieldProps) {
  return (
    <MuiTextField
      variant={variant}
      size={size}
      sx={{
        " .MuiFilledInput-root": {
          height
        },
      }}
      color={color}
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      label={label}
      helperText={helperText}
      hiddenLabel={hiddenLabel}
    />
  );
}
