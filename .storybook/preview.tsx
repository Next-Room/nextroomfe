"use client";

import { ThemeProvider, createTheme } from "@mui/material"; // 여기서 'ThemeProvider'를 임포트합니다.
import themeMui from "../app/style/ThemeMUI.json"; // 이 경로는 실제 JSON 테마 파일의 위치에 따라 달라집니다.
import React from "react";

// JSON 테마 객체를 Material-UI 테마로 변환
const theme = createTheme(themeMui as any);

// Storybook의 모든 스토리에 테마를 제공하는 데코레이터
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "main",
      values: [
        {
          name: "main",
          value: "#1A1B1B",
        },
        {
          name: "gray",
          value: "#F3F5FB",
        },
        {
          name: "white",
          value: "#FFFFFF",
        },
        {
          name: "black",
          value: "#000000",
        },
        {
          name: "blue",
          value: "#2E48A0",
        },
      ],
    },
  },
};

export default preview;
