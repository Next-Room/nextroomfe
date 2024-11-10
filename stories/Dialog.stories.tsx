import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dialog, DialogProps } from "./Dialog.component"; // Dialog 컴포넌트의 경로에 맞게 수정하세요

export default {
  title: "Component/Dialog",
  component: Dialog };
export const Playground = {
  args: {
    label: "대화 상자 제목",
    content: "대화 상자 내용을 여기에 추가하세요.",
    open: false,
  },
  render: (args: DialogProps) => <Dialog {...args} />,
};
