import React from "react";
import { useModalStateValue } from "@/components/atoms/modals.atom";
import { useSearchParams } from "next/navigation";
import CreateTheme from "./CreateTheme/Container";
import ThemeInfo from "./ThemeInfo/Container";

export default function ContentArea() {
  const modals = useModalStateValue();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString()).toString();

  return (
    <div className="content-area" key={params}>
      {params ? (
        <>
          <ThemeInfo />
          {modals.map((modal, index) => {
            const { Component, props } = modal;
            return (
              <div className={`modal-${index}`} key={`${params}`}>
                <Component {...props} />
              </div>
            );
          })}
        </>
      ) : (
        <CreateTheme />
      )}
    </div>
  );
}

ContentArea.defaultProps = {
  type: "", // 기본값 설정
};
