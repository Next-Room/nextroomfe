"use client";

import React, { useEffect, useState } from "react";
import { useGetThemeList } from "@/queries/getThemeList";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import { useSnackBarInfo } from "@/components/atoms/snackBar.atom";
import SnackBar from "@/components/SnackBar/SnackBar";
import Loader from "@/components/Loader/Loader";
import useChannelTalk from "@/hooks/useChannelTalk";
import HomeView from "./HomeView";

function Home() {
  const { data: categories = [] } = useGetThemeList();
  const [open, setOpen] = useState<boolean>(false);
  const [snackInfo, setSnackBarInfo] = useSnackBarInfo();
  useChannelTalk();

  const handleDialog = () => {
    setOpen(!open);
  };

  const isSignIn = useCheckSignIn();

  useEffect(() => {
    if (snackInfo.isOpen) {
      setTimeout(() => {
        setSnackBarInfo({ ...snackInfo, isOpen: false });
      }, 3000);
    }
  }, [setSnackBarInfo, snackInfo]);

  const themeAllProps = {
    categories,
    handleDialog,
  };

  if (!isSignIn) return <Loader />;

  return (
    <>
      <HomeView {...themeAllProps} />
      <SnackBar
        open={snackInfo.isOpen}
        ment={snackInfo.message}
        vertical="bottom"
        horizontal="left"
        handleClose={() => setSnackBarInfo({ ...snackInfo, isOpen: false })}
      />
    </>
  );
}

export default Home;
