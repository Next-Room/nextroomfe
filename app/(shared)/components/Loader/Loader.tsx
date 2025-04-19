"use client";

import Lottie from "react-lottie-player";

import loaderJson from "../../../../public/lottie/loader.json";

import styles from "./loader.module.sass";

type Props = {
  isLoading?: boolean;
};

function Loader(props: Props) {
  const { isLoading = true } = props;

  if (!isLoading) return null;

  return (
    <div className={styles.loaderWrapper}>
      <Lottie
        loop
        animationData={loaderJson}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}

export default Loader;
