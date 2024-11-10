import React from "react";
import Stack from "@mui/material/Stack";
import { TextField, TextFieldProps } from "./TextField.component";

export default {
  title: "Component/TextField",
  component: TextField,
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    placeHolder: { control: "text" },
  },
};

export const Playground = {
  args: {
    size: "small",
    label: "Click me!",
    placeHolder: "미리보기",
  },
  render: (args: TextFieldProps) => <TextField {...args} />,
};
export const Variants = {
  render: (args: TextFieldProps) => (
    <Stack spacing={2} maxWidth={300}>
      <TextField variant="filled" {...args} />
      <TextField variant="filled" error {...args} />
      <TextField variant="filled" hiddenLabel {...args} label="" />
      <TextField variant="filled" error hiddenLabel {...args} label="" />
      <TextField variant="filled" hiddenLabel {...args} disabled label="" />
    </Stack>
  ),
};
