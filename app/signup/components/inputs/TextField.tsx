"use client";
import { useEffect, useRef, useState } from "react";

import "../../styles/textfield.modules.sass";
import useClickOutside from "@/(shared)/hooks/useClickOutside";

import { TextFieldPropsType } from "../../types/SignUp";

export const SignUpTextField = (props: TextFieldPropsType) => {
  const {
    id,
    error,
    label,
    type,
    inputProps,
    helperText,
    placeholder,
    disabled,
    value,
    className,
    require,
  } = props;
  const inputRef = useRef<HTMLLabelElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    }, 1000);
  }, []);

  useClickOutside(divRef, () => {
    setIsFocused(false);
  });
  return (
    <div className={className}>
      <div
        data-error={error}
        className={`textfield-div input_item id ${
          isFocused || value !== "" ? "focus" : ""
        }`}
        id={`textfield-${id}`}
        onClick={() => setIsFocused(true)}
        ref={divRef}
      >
        <label
          htmlFor="id"
          className="textfield-label text_label"
          id="id_old_label"
          aria-hidden="true"
          ref={inputRef}
          data-error={error}
        >
          {label}
          {require && <span className="signup-google-require">*</span>}
        </label>
        <input
          className="textfield-input"
          type={type}
          placeholder={isFocused ? placeholder : ""}
          id={`textfield-input-${id}`}
          autoCapitalize="none"
          title="아이디"
          aria-label="아이디"
          disabled={disabled}
          {...inputProps}
        />
      </div>
      <p className="textfield-supporting-text" data-error={error}>
        {helperText}
      </p>
    </div>
  );
};
