import React from "react";
import Stack from "@mui/material/Stack";
import { Snackbar, SnackbarProps } from "./Snackbar.component";

export default {
  title: "Component/Snackbar",
  component: Snackbar,
};

export const Playground = {
  args: {
    anchorOrigin: { vertical: "top", horizontal: "center" },
    open: true,
    autoHideDuration: 3000,
    label: "Click me!",
  },
  render: (args: SnackbarProps) => <Snackbar {...args} />,
};

export const Variants = {
  render: () => (
    <Stack spacing={2} maxWidth={300}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open
        autoHideDuration={5000}
        label="Top Left"
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open
        autoHideDuration={3000}
        label="Top Center"
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open
        autoHideDuration={1000}
        label="Top Right"
      />
    </Stack>
  ),
};
