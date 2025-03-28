import classNames from "classnames";

import { useCreateThemeValue } from "@/(shared)/atoms/createTheme.atom";

export default function CreateThemeAddButton() {
  const createTheme = useCreateThemeValue();
  const isDisabled = !(
    createTheme.title &&
    createTheme.timeLimit &&
    createTheme.hintLimit
  );

  return (
    <button
      type="submit"
      className={classNames("create-theme__add-button", {
        disable: isDisabled,
      })}
      disabled={isDisabled}
    >
      테마 추가
    </button>
  );
}
