import { styled } from "styled-components";
import { Button } from "@mui/material";

// export const Wrapper = styled.div`
//   margin: 18px 20px;
//   display: flex;
//   flex-direction: column;
// `;

export const Wrapper = styled.form`
  /* background: var(--nrdark-01, #151516); */
height: 100vh;
`;
export const Cont = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 364px;
  margin: 0 auto;
`;

export const MobileWrapper = styled.div`
  /* padding: 0 26px; */
`;

export const BackWrapper = styled.div`
  height: 64px;
  padding: 18px 20px;
  margin-bottom: 26px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 140%;
  margin: 0;
`;

export const Contect = styled.p`
  color: var(--nr-gray-01, #9898a0);
  /* Pretendard/R/16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-top: 12px;
`;

export const Btn = styled(Button)`
  font-size: 14px !important;
  font-weight: 600 !important;
  line-height: 20px !important;
  height: 60px !important;
  margin-top: 44px !important;
`;

export const TextCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 21px;
`;
