import React from "react";
import { Color } from "./Color.component";

export default {
  title: "Component/Color",
  component: Color,
  argTypes: {
    backgroundColor: { control: "color" },
    label: { control: "text" },

    disabled: { control: "boolean" },
  },
};

export const variants = {
  render: () => <></>,
};

export const Background = {
  render: () => (
    <>
      <Color type="main">main</Color>
      <Color type="sub1">sub1</Color>
      <Color type="sub2">sub2</Color>
    </>
  ),
};

export const Stroke = {
  render: () => (
    <>
      <Color type="white5">white5</Color>
      <Color type="white8">white8</Color>
      <Color type="white12">white12</Color>
    </>
  ),
};

export const Text = {
  render: () => (
    <>
      <Color type="white20">white20</Color>
      <Color type="white50">white50</Color>
      <Color type="white70">white70</Color>
    </>
  ),
};
