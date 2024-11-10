// MainDrawer.stories.tsx
import React from "react";
// eslint-disable-next-line import/extensions
import MainDrawer from "./Drawer.component";

export default {
  title: "Component/Drawer",
  component: MainDrawer,
};
export const Playground = {
  args: {
    label: "대화 상자 제목",
    content: "대화 상자 내용을 여기에 추가하세요.",
    open: false,
  },
  render: () => <MainDrawer />,
};
