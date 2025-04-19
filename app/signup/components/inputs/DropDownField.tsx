"use client";

import "../../styles/dropdown.modules.sass";
import Image from "next/image";
import { useRef, useState } from "react";

import useClickOutside from "@/(shared)/hooks/useClickOutside";

import { DropDownPropsType } from "../../types/SignUp";

export const SignUpDropDownField = (props: DropDownPropsType) => {
  const { label, selectedText, options, setValue, require } = props;
  const divRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedText);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    setValue(option);
  };

  useClickOutside(divRef, () => {
    setIsOpen(false);
  });

  const arrawDownImageProps = {
    src: "/images/svg/icon_ArrowDownMini_default.svg",
    alt: "arrow",
    width: 30,
    height: 30,
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-google google ${isOpen ? "active-textfield" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="dropdown-textbox">
          <div className="dropdown-label">
            {label}
            {require && <span className="signup-google-require">*</span>}
          </div>
          <button className="dropdown-input-text">{selected}</button>
        </div>
        <Image {...arrawDownImageProps} />
      </div>
      <ul
        className={`dropdown-option-list ${
          isOpen ? "active-optionlist dropdown-open" : ""
        }`}
      >
        {options?.length &&
          options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="dropdown-option"
            >
              {option}
            </li>
          ))}
      </ul>
    </div>
  );
};
