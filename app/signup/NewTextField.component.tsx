/* use client */

import React, { forwardRef, useEffect, useRef, useState } from "react";
import "../style/reset.css";
import "./style.css";
import { styled } from "styled-components";
import useClickOutside from "@/hooks/useClickOutside";

interface SupportingTextProps {
  error: boolean;
}

export interface TextFieldProps {
  label: string;
  disabled: boolean;
  error: boolean;
  placeholder: string;
  helperText: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>;

const Label = styled.label<SupportingTextProps>`
  color: ${({ error }) => (error ? "#f2b8b5" : "#89888a")};
  display: inline-block;
  position: absolute;
  bottom: 28px;
  left: 22px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  box-sizing: border-box;
  z-index: 33;
`;

const Input = styled.input`
  height: 22px;
  padding: 50px 20px 32px 20px;
  font-size: 16px;
  color: #89888a;
  &:focus {
    color: white;
  }
  line-height: 22px;
  background-color: transparent;
  caret-color: white;
`;

const Div = styled.div<SupportingTextProps>`
  display: flex;
  width: 100%;
  height: 80px;
  border: 1px solid ${({ error }) => (error ? "#f2b8b5" : "#89888a")};
  position: relative;
  background: #121212;
  border-radius: 8px;
  flex-direction: column;

  &:focus-within {
    border: 1px solid ${({ error }) => (error ? "#f2b8b5" : "white")};
  }

  &:hover {
    background-color: black;
  }

  &:disabled {
    border: #474547;
  }

  input:focus {
    outline: none;
    color: #fff;
  }
`;
const SupportingText = styled.p<SupportingTextProps>`
  color: ${({ error }) => (error ? "#f2b8b5" : "#89888a")};
  font-size: 12px;
  line-height: 16px;
  margin: 4px 16px;
`;

export const NewTextField = forwardRef((props: Props) => {
  const {
    error,
    label,
    disabled,
    type,
    inputProps,
    helperText,
    style,
    placeholder,
    value,
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
    <div>
      <Div
        error={error}
        style={style}
        className={`input_item id ${isFocused || value !== "" ? "focus" : ""}`}
        id="input_item_id"
        onClick={() => setIsFocused(true)}
        ref={divRef}
      >
        <Label
          htmlFor="id"
          className="text_label"
          id="id_old_label"
          aria-hidden="true"
          ref={inputRef}
          error={error}
        >
          {label}
        </Label>
        <Input
          type={type}
          placeholder={isFocused ? placeholder : ""}
          disabled={disabled}
          id="id"
          name="id"
          autocapitalize="none"
          title="아이디"
          aria-label="아이디"
          {...inputProps}
        />
      </Div>
      <SupportingText error={error}>{helperText}</SupportingText>
    </div>
  );
});
