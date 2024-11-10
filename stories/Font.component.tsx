import theme from "../app/style/theme";
import React from "react";
import styled, { css } from "styled-components";

interface FontProps {
  children: React.ReactNode;
  type: keyof typeof theme;
  lineHeight?: string;
}

// 스타일 정의
const Title = styled.p<FontProps>`
  ${({ type }) => theme[type]};
  line-height: ${({ lineHeight }) => lineHeight};
  color: white;
`;

export function Font({ children, type, lineHeight = "120%" }: FontProps) {
  return (
    <Title type={type} lineHeight={lineHeight}>
      {children}
    </Title>
  );
}
