import React from "react";
import ThemeTextField from "../../../(shared)/(ThemeTextField)/Container";
import {
  hintCountTextFieldProps,
  nameTextFieldProps,
  timeTextFieldProps,
} from "./createTheme";

export default function CreateThemeBody() {
  return (
    <div className="create-theme__body">
      <ThemeTextField {...nameTextFieldProps} />
      <ThemeTextField {...timeTextFieldProps} />
      <ThemeTextField {...hintCountTextFieldProps} />
    </div>
  );
}
