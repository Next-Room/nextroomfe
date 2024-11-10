import React from "react";
import { Font } from "./Font.component";

export default {
  title: "Component/Font",
  component: Font,
  argTypes: {
    backgroundColor: { control: "color" },
    label: { control: "text" },

    disabled: { control: "boolean" },
  },
};

export const variants = {
  render: () => <></>,
};

export const Title = {
  render: () => (
    <>
      <Font type="title24M">title24M</Font>
      <Font type="title20SB">title20SB</Font>
      <Font type="title20M">title20M</Font>
      <Font type="title18SB">title18SB</Font>
      <Font type="title18M">title18M</Font>
      <Font type="title16SB">title16SB</Font>
      <Font type="title16M">title16M</Font>
    </>
  ),
};

export const Body = {
  render: () => (
    <>
      <Font type="body16M" lineHeight="140%">
        body16M
      </Font>
      <Font type="body16R" lineHeight="140%">
        body16R
      </Font>
      <Font type="body14M" lineHeight="140%">
        body14M
      </Font>
      <Font type="body14R" lineHeight="140%">
        body14R
      </Font>
      <Font type="body12M" lineHeight="140%">
        body12M
      </Font>
      <Font type="body12R" lineHeight="140%">
        body12R
      </Font>
    </>
  ),
};

export const Caption = {
  render: () => (
    <>
      <Font type="caption12SB">caption12SB</Font>
      <Font type="caption12M">caption12M</Font>
    </>
  ),
};

export const Button = {
  render: () => (
    <>
      <Font type="body14M" lineHeight="100%">
        button14M
      </Font>
      <Font type="body12M" lineHeight="100%">
        button12M
      </Font>
    </>
  ),
};
