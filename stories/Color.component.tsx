import { backGroundColor } from "../app/style/theme";
import React from "react";
import styled, { css } from "styled-components";

interface ColorProps {
  children: React.ReactNode;
  type: keyof typeof backGroundColor;
}

// 스타일 정의
const ColorBox = styled.div<ColorProps>`
  width: 100px;
  height: 100px;
  border: 1px solid #8487901f;
  margin: 10px;
  background-color: ${({ type }) => backGroundColor[type]};
  color: white;
  text-align: center;
  line-height: 100px;
`;

export function Color({ children, type }: ColorProps) {
  return <ColorBox type={type}>{children}</ColorBox>;
}
