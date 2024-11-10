import React from "react";
import { NewButton } from "./NewButton.component";

export default {
  title: "Component/NewButton",
  component: NewButton,
  argTypes: {
    backgroundColor: { control: "color" },
    label: { control: "text" },

    disabled: { control: "boolean" },
  },
};

export const Variants = {
  render: () => <NewButton />,
};
