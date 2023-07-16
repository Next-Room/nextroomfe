import React, { useEffect, useState } from "react";
import * as S from "./MakeThemeModalView.styled";
import { Box, Button, Grid, TextField, Card, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";

type Props = {
  formProps: Record<string, any>;
  textFieldProps: Record<string, any>;
};

const MakeThemeModalView = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit, formState, watch } = useForm();
  const { formProps, textFieldProps } = props;

  useEffect(() => {
    console.log({ watch });
  }, [watch]);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <S.Container>
          <S.CardWrap
            container
            sx={{ width: 312, height: 408, aline: "center" }}
          >
            <S.Title>테마 추가하기</S.Title>
            <S.Description>
              테마 추가 후 힌트를 등록할 수 있어요!
              <br />
              아래 정보는 언제든지 수정 가능합니다.
            </S.Description>
            <S.TextWrapper>
              <Grid item xs={8}>
                <TextField
                  {...textFieldProps[0]}
                  {...register(textFieldProps[0].id)}
                />
              </Grid>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <TextField
                    {...textFieldProps[1]}
                    {...register(textFieldProps[1].id)}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    {...textFieldProps[2]}
                    {...register(textFieldProps[2].id)}
                  />
                </Grid>
              </Grid>
            </S.TextWrapper>
            <S.ButtonContainer>
              <Button variant="contained" onClick={handleClose}>
                확인
              </Button>
            </S.ButtonContainer>
          </S.CardWrap>
        </S.Container>
      </Modal>
    </div>
  );
};

export default MakeThemeModalView;