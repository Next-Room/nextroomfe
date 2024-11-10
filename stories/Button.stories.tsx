import React from "react";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { Button, ButtonProps } from "./Button.component";

export default {
  title: "Component/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    label: { control: "text" },

    disabled: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    size: "small",
    label: "Click me!",
  },
  render: (args: ButtonProps) => <Button {...args} />,
};
export const Variants = {
  render: (args: ButtonProps) => (
    <Stack spacing={2} maxWidth={300}>
      <Button
        variant="text"
        label="Text Button"
        backgroundColor="black"
        {...args}
      />
      <Button variant="contained" label="Contained Button" {...args} />
      <Button
        variant="outlined"
        label="Outlined Button"
        backgroundColor="black"
        {...args}
      />
    </Stack>
  ),
};

export const Examples = {
  render: (args: ButtonProps) => (
    <Stack spacing={2} maxWidth={300}>
      <Button
        variant="contained"
        width="97px"
        height="40px"
        fontWeight="600"
        label="추가하기"
        {...args}
      />
      <Button
        variant="contained"
        width="360px"
        height="56px"
        fontWeight="600"
        label="로그인"
        {...args}
      />

      <Button
        variant="outlined"
        width="147px"
        height="40px"
        fontWeight="600"
        label="테마 수정하기"
        startIcon={<EditIcon />}
        backgroundColor="black"
        {...args}
      />
      <Button
        variant="text"
        width="49px"
        height="40px"
        label="취소"
        backgroundColor=""
        {...args}
      />
    </Stack>
  ),
};
