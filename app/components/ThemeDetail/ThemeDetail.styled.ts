import { styled } from "styled-components";
import { Box, Button } from "@mui/material";

export const Wrapper = styled(Box)`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  
  flex: 1; /* 남은 공간을 차지 */

`;

export const Title = styled.div`
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  white-space: pre-wrap;
  word-break: break-word;
`;

export const MiddleTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.sm};
  opacity: 0.7;
`;

export const UpdateButton = styled(Button)`
  width: 147px;
  height: 40px;
  font-size: ${(props) => props.theme.fontSize.sm};
`;
