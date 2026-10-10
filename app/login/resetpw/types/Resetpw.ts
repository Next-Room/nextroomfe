import { UseFormRegisterReturn } from "react-hook-form";

export interface FindpwValueType {
  email: string;
}

export interface PasswordValueType {
  password: string;
  passwordConfirm: string;
}

export type TextFieldPropsType = {
  id: string;
  type: string;
  helperText: string | undefined;
  error: boolean;
  disabled?: boolean;
  variant: string;
  label: string;
  value: string;
  placeholder: string;
  inputProps: UseFormRegisterReturn;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  require?: boolean;
};
