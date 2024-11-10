import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import { useCreateTheme } from "@/components/atoms/createTheme.atom";
import { useCreateHint } from "@/components/atoms/createHint.atom";
import { ThemeInfoTextFieldType } from "./TextFieldType";

const useTextField = ({
  id,
  content,
  checkErrorText,
}: ThemeInfoTextFieldType) => {
  const [inputValue, setInputValue] = useState<string>(content || "");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setCreateHint] = useCreateHint();
  const [, setCreateTheme] = useCreateTheme();

  useEffect(() => {
    if (errorText) return;
    setCreateTheme((prev) => ({
      ...prev,
      [id]: inputValue,
    }));
    setCreateHint((prev) => ({
      ...prev,
      [id]: inputValue,
    }));
  }, [inputValue, id, setCreateTheme, setCreateHint, errorText]);

  useEffect(() => {
    if (!isFocus || !inputRef.current) {
      setErrorText("");
      return;
    }
    inputRef.current.focus();
  }, [isFocus]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cur = e.target.value;
    if (cur.length > 1 && cur.length === cur.split("0").length - 1) {
      setInputValue("0");
      return;
    }
    const error = checkErrorText ? checkErrorText(cur) : "";
    if (error) {
      setErrorText(error);
      setInputValue(inputValue);
      return;
    }
    setErrorText("");
    setInputValue(cur);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget ||
      (e.relatedTarget.className !== "theme-info focus" &&
        e.relatedTarget.className !== "theme-info error")
    ) {
      setIsFocus(false);
      return;
    }
    inputRef.current?.focus();
    setIsFocus(true);
  };

  return {
    inputValue,
    isFocus,
    setIsFocus,
    errorText,
    inputRef,
    handleInputChange,
    handleInputBlur,
  };
};

export default useTextField;
