import { css } from "styled-components";

const fontSize = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "36px",
};

const fontWeight = {
  light: "400",
  normal: "500",
  medium: "600",
  bold: "700",
};

const color = {
  white: "#fff",
  white10: "#ffffff10",
  white20: "#ffffff20",
  white70: "#ffffff70",
};

export const backGroundColor = {
  main: "#131417",
  sub1: "#1F2023",
  sub2: "#3A3B3D",
  white5: "#FFFFFF0D",
  white8: "#FFFFFF1F",
  white12: "#FFFFFF1F",
  white20: "#FFFFFF33",
  white50: "#FFFFFF80",
  white70: "#FFFFFFB2",
};


export const title24M = css`
  font-size: 24px;
  font-weight: 600;
`;

export const title20M = css`
  font-size: 20px;
  font-weight: 600;
`;

export const title20SB = css`
  font-size: 20px;
  font-weight: 600;
`;

export const title18M = css`
  font-size: 18px;
  font-weight: 500;
`;

export const title18SB = css`
  font-size: 18px;
  font-weight: 600;
`;

export const title16SB = css`
  font-size: 16px;
  font-weight: 600;
`;

export const title16M = css`
  font-size: 16px;
  font-weight: 500;
`;

export const body16M = css`
  font-size: 16px;
  font-weight: 500;
`;

export const body16R = css`
  font-size: 16px;
  font-weight: 400;
`;

export const body14M = css`
  font-size: 16px;
  font-weight: 500;
`;

export const body14R = css`
  font-size: 14px;
  font-weight: 400;
`;
export const body12M = css`
  font-size: 12px;
  font-weight: 500;
`;

export const body12R = css`
  font-size: 12px;
  font-weight: 400;
`;

export const caption12SB = css`
  font-size: 12px;
  font-weight: 600;
`;
export const caption12M = css`
  font-size: 12px;
  font-weight: 500;
`;

const theme = {
  fontSize,
  fontWeight,
  color,
  backGroundColor,
  title24M,
  title20M,
  title20SB,
  title18SB,
  title18M,
  title16SB,
  title16M,
  body16M,
  body16R,
  body14M,
  body14R,
  body12M,
  body12R,
  caption12SB,
  caption12M,
};

export default theme;
