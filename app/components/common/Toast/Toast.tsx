import React from "react";
import "./toast.css";
import { useToastValue } from "@/components/atoms/toast.atom";

export default function Toast() {
  const { title, text } = useToastValue();

  return (
    <div className="toast-container">
      <div className="toast-message">
        <p className="toast-title">{title}</p>
        <p className="toast-body">{text}</p>
      </div>
    </div>
  );
}
