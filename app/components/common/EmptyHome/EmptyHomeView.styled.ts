import { Button } from "@mui/material";
import { styled } from "styled-components";

export const Wrapper = styled.div``;

export const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  line-height: 49px;
  margin-bottom: 36px;
`;

export const AddButton = styled(Button)`
  font-weight: bold;
  margin-bottom: 1rem;
 
`;
