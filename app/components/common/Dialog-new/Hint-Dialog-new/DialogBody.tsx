import React from "react";

interface DialogBodyProps {
  type: string;
}

export default function DialogBody({ type }: DialogBodyProps) {
  return (
    <div className="theme-info-modal__content">
      <div className="text">
        {type === "put"
          ? "지금까지 작성한 내용은 저장되지 않습니다."
          : "삭제한 내용은 복구할 수 없습니다."}
      </div>
    </div>
  );
}
