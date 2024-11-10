import React from "react";
import "../app/style/reset.css";
import styled from "styled-components";

interface SupportingTextProps {
  error: boolean;
}

interface SupportingTextProps {
  error: boolean;
}

export interface TextFieldProps {
  label: string;
  disabled: boolean;
  error: boolean;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  placeholder?: string;
  helperText: string;
}

const Label = styled.label`
  position: absolute;
  color: #89888a;

  top: 20px;
  left: 20px;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 20px;
`;

const LabelOnly = styled.label<{ error: boolean }>`
  position: absolute;
  margin: 30px 22px;
  font-size: 16px;
  line-height: 22px;
  color: ${({ error }) => (error ? "#f2b8b5" : "#89888a")};

  font-weight: 400;
`;

const Input = styled.input`
  height: 22px;
  padding: 50px 20px 32px 20px;
  font-size: 16px;
  color: white;
  line-height: 22px;
  background-color: transparent;
`;

const Div = styled.div<SupportingTextProps>`
  display: flex;
  width: 100%;
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
  label: {
    color: ${({ error }) => (error ? "#f2b8b5" : "#89888a")};
  }

  input:focus {
    outline: none;
    &::placeholder {
      /* Placeholder의 CSS 설정 */
      color: black; /* Placeholder의 텍스트 색상 지정 */
      font-size: 14px; /* Placeholder의 글꼴 크기 지정 */
    }
  }
`;
const SupportingText = styled.p<SupportingTextProps>`
  color: ${({ error }) => (error ? "#f2b8b5" : "#89888a")};
  font-size: 12px;
  line-height: 16px;
  margin: 4px 16px;
`;

export function NewTextField({
  label = "Label text",
  disabled = false,
  error = false,
  placeholder = "Input text",
  helperText = "Supporting text",
}: TextFieldProps) {
  return (
    <div>
      <Div error={error}>
        <Label htmlFor="textField">{label}</Label>
        <Input id="textField" disabled={disabled} placeholder={placeholder} />
      </Div>
      <SupportingText error={error}>{helperText}</SupportingText>
    </div>
  );
}

export function NewTextFieldLabel({
  label = "Label text",
  disabled = false,
  error = false,
  helperText = "Supporting text",
}: TextFieldProps) {
  return (
    <div>
      <Div error={error}>
        <LabelOnly htmlFor="textField" error={error}>
          {label}
        </LabelOnly>
        <Input id="textField" disabled={disabled} />
      </Div>
      <SupportingText error={error}>{helperText}</SupportingText>
    </div>
  );
}
